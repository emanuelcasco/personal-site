---
title: 'Mejora tús Azure Functions con estas buenas practicas'
excerpt: 'Trucos y tips para llevar tús Azure Functions al siguiente nivel con Node.js.'
coverImage: '/assets/blog/improve-your-azure-functions-with-this-best-practices/cover.jpg'
date: '2019-09-23T00:00:00Z'
author:
  name: Emanuel Casco
  picture: '/assets/avatar.png'
ogImage:
  url: '/assets/blog/improve-your-azure-functions-with-this-best-practices/cover.jpg'
---

## Introduction

Este artículo present una **colección de buenas practicas para trabajar con [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) en Node.js**. Las recomendaciones fueron extraídas y adaptadas, en su mayoría, de la propia documentación de Azure y experiencias personales.

Como se menciona arriba, este post se centrará en Node.js, sin embargo, las buenas practicas presentadad pueden ser útiles en cualquier lenguaje.

## TL;DR

- Evitar que las funciones se ejecuten por tiempo prolongado.
- Evitar que las funciones se llamen entre sí (cross-functions communication).
- Compartir conexiones con servicios externos.
- Mantener las funciones puras.
- Usar un orquestador de infraestructura.
- Escribir funciones defensivas.
- Evitar que tus funciones se llenen de polución.

## Evitar que las funciones se ejecuten por tiempo prolongado

Una función puede extenderse en el tiempo debido a dependencias externas o mucho procesamiento, esto resulta en *timeouts* inesperados y procesos sin finalizar correctamente. Para prevenir esto, tener en cuenta:

- Monitorear las dependencias externas y evitar, en lo posible, aquellas que puedan hacer que nuestras funciones se extiendan en el tiempo.
- Refactorear funciones largas en piezas más pequeñas de código que trabajen de manera conjunta y retornen respuestas rápidas.
- Respetar el principio de única responsabilidad, cada función debería encargarse de una, y solo una, tarea.

<img alt="Refactor large functions into smaller pieces of code that work together and return responses fast." src="/assets/blog/improve-your-azure-functions-with-this-best-practices/image01.png" />

Por ejemplo, imaginemos una una función que se dispara por una llamada HTTP. Las request HTTP sueles requerir de una respuesta lo más rapida posible, por lo tanto, puede responder al cliente de inmediato que la operación se esta procesando y encolar el mensaje para ser procesado de manera asincrónica por otra función.

## Evitar que las funciones se llamen entre sí (cross-functions communication)

Azure Functions no fue pensado para manejar comunicación directa entre funciones, En lo posible, **utilize Azure Queue Storage para comunicar dos o más funciones**.

<img alt="Prefer Azure Queue Storage for cross-function communication." src="/assets/blog/improve-your-azure-functions-with-this-best-practices/image02.png" />

Si fuese necesario construir topologías más complejas también se puede utilizar [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) que ayuda a enviar mensajes a multiples subscriptores y aplicar filtros. Por otro lado, [Azure Events Hubs](https://azure.microsoft.com/en-us/services/event-hubs/) es útil para soportar altos volumenes de carga.

## Compartir conexiones con servicios externos

**Crear y destruir instancias de un objeto que es compartido entre funciones hiere a la performance**. Algunos consejos para manejar estás conexiones son:

- Reutilizar las instancias de los clientes, en lugar de crear nuevos en cada invocación de una función.
- Crear un singleton para cada cliente y reutilizarlo entre funciones.
- Mantener el singleton mencionado en el punto anterior puro.

```js
// DO NOT ❌
// myFunction.js
const Redis = require('redis');
module.exports = function (ctx, input) {
   const redis = new Redis(config);
   ...
};
   
// DO ✅
// myFunction.js
const Redis = require('redis');
const redis = new Redis(config); // re-utiliced by Azure
module.exports = function (ctx, input) { ... };
   
// CONSIDER 👍
// redisWrapper.js
const Redis = require('redis');
let redis;​
const instanceService = config => redis || new Redis(config);
module.exports = config => instanceService(config);
// myFunction.js
const redis = require('redisWrapper');
module.exports = function (ctx, input) { ... };
```

Links útiles:

- [Manage connections in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections).

## Mantener puras las funciones.

Una función pura tiene dos características principales:
- **No tiene estado**, o sea, no produce efectos colaterales.
- **Es deterministica**. Por lo tanto, dado una misma entrada siempre produce la misma salida.

**Azure Functions corre en contenedores sin estado que se disparan en base a eventos**, estos son efímeros (pueden durar solo una invocación), y son totalmente administrados por Azure. Por lo tanto, no es recomendable guardar estado en las funciones. En caso de ser necesario, se debe asociar el estado a un almacenamiento externo DocumentDB or Azure SQL.

## Usar un orquestador de infraestructura

**Serverless still requires infrastructure management**. Managing serverless infrastructure requires discipline to ensure it can be effectively maintained.

To manage your infrastructure, and keep it documented, it is recommended to use an infrastructure orchestrator. Infrastructure as code is a way of managing your devices and servers. This is done through machine-readable definition files.
Basically, you write down how you want your infrastructure to look like and what code should be run on that infrastructure. A highly recommended tool is [Terraform](https://www.terraform.io/).

## Write defensive functions

**Assume your functions could throw an exception at any time**. They should be able to continue from a previous fail point in the next execution. If you are using a queue to communicate, consider a re-queue strategy in order to not lose information.

Azure will retry to process a failed function input when you pass an error with the `context.done` method. Retries number and time window between them are defined in your `host.js` file.

Also, you can implement a custom [exponential backoff strategy](https://en.wikipedia.org/wiki/Exponential_backoff) to re-queue your messages after an increasing range time. This is especially useful to dispel possible inconveniences caused by high traffic.

**Validate your inputs**! You can implement Object Schema Validation in your functions before processing inputs. There are great tools out there but I recommend [Joi](https://github.com/sideway/joi), the most widely adopted package for object schema validation. It has a great api and excellent documentation.

**Beware of Third-Party Packages**. It’s important to be aware of the security risks, especially when it comes to dependency chains. Audit your packages, if possible implement it in your CI/CD pipeline. The `npm audit` command submits a description of the dependencies configured in your package to your default registry and asks for a report of known vulnerabilities.

Meet the **Meet the Dead Letter Queue (DLQ)**. Azure Service Bus stores messages in the queues until processed, but there are several reasons for such undelivered messages, like exceeding MaxDeliveryCount, exceeding TimeToLive, errors while processing subscription rules, etc.
What happens with undelivered messages? They are sent to an DLQ.

If you want to access the undelivered message from the Topic then, the syntax of reading the Dead Letter Queue will be: `TopicName/Subscriptions/SubscriptionName/$DeadLetterQueue`

## Avoid code pollution

Serverless architectures biggest benefit is you can focus on implement your business logic. Problems begin when you have to **deal with common technical concerns outside your business logic**. For example: input parsing and validation, output serialization, error handling, and more.

All this necessary code ends up polluting your business logic, making it harder to read and maintain. [Azure Middleware Engine](https://www.npmjs.com/package/azure-middleware) helps developers to **divide the problem in smaller pieces**, isolating logic into “steps”, keeping your code clean, readable and easy to maintain.

Example:

```js
const ChainedFunction = new MiddlewareHandler()
  .use((context, input) => {
    asyncFunction(input)
      .then(res => {
        context.log.info('Im called first');
        context.next();
      });
  })
  .use(context => {
    context.log.info('Im called second');
    context.done(null, { status: 200 });
  })
  .catch((err, context, input) => {
    context.log.error(`Something went wrong. Error: ${err}`);
    context.done(err, { status: 500});
  });
 
module.exports = ChainedFunction.listen();
```

## En resumen

Terminamos aquí, estas buenas practicas me ayudaron a mi equipo y a mí a mejorar nuestra productividad, la cálidad del código y la performance de las funciones. Si también te son útiles, por favor, dejamelo saber contactandome por cualquiera de los canales que dejo debajo.

Links:
- Publique este post originalmente en Medium, puedes encontrarlo en el siguiente link: [Improve your Azure Functions with this best practices](https://medium.com/@emanuelcasco/improve-your-azure-functions-with-this-best-practices-da8fd0123318).
- [Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).

¡Gracias por leer hasta aquí!

---

Puedes seguirme en [Twitter](https://twitter.com/Emanuel_Casco), [GitHub](https://github.com/emanuelcasco) o [LinkedIn](https://www.linkedin.com/in/emanuelcasco/).