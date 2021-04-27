---
title: 'Mejora tús Azure Functions con estas buenas practicas'
excerpt: 'Trucos y tips para llevar tús Azure Functions al siguiente nivel con Node.js.'
coverImage: '/assets/blog/improve-your-azure-functions-with-this-best-practices/cover.jpg'
date: '2019-09-23T00:00:00Z'
tags: [backend, serverless, azure functions, nodejs, javascript]
---

## Introducción

Este artículo present una **colección de buenas practicas para trabajar con [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) en Node.js**. Las recomendaciones fueron extraídas y adaptadas, en su mayoría, de la propia documentación de Azure y experiencias personales.

Como se menciona arriba, este post se centrará en Node.js, sin embargo, las buenas practicas presentadad pueden ser útiles en cualquier lenguaje.

:::info Info
Publique este post originalmente en Medium, puedes encontrarlo en el siguiente link: [Improve your Azure Functions with this best practices](https://medium.com/@emanuelcasco/improve-your-azure-functions-with-this-best-practices-da8fd0123318).
:::

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

- [Manejar conexiones en Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections).

## Mantener puras las funciones.

Una función pura tiene dos características principales:
- **No tiene estado**, o sea, no produce efectos colaterales.
- **Es deterministica**. Por lo tanto, dado una misma entrada siempre produce la misma salida.

**Azure Functions corre en contenedores sin estado que se disparan en base a eventos**, estos son efímeros (pueden durar solo una invocación), y son totalmente administrados por Azure. Por lo tanto, no es recomendable guardar estado en las funciones. En caso de ser necesario, se debe asociar el estado a un almacenamiento externo DocumentDB or Azure SQL.

## Usar un orquestador de infraestructura

**Una arquitectura Serverless también necesita que se administre infraestructura**. Si bien no trabajamos directamente con lso servidores, si es necesario administrar nuestra red de funciones. Esta tarea puede volverse complicada a medida que nuestro sistema crece, por lo tanto es aconsejable apoyarse en una herramienta que nos facilite la tarea.

Para manejar esta infraestructura, y mantenerla documentada, es recomendable utilizar un **orquestador de infraestructura**. La "Infraestructura como código" ("Infrastructure as code") es una manera de manejar tus servicios en la nube a travez de archivos de texto. Basicamente, posibilitan que escribamos que necesitamos de infraestructura y lo trasladan a la nube de forma declarativa.

Hay varias herramientas disponibles, pero yo recomiendo [Terraform](https://www.terraform.io/).

## Escribir funciones defensivas

**Asume que tus funciones podrían lanzar una excepción en cualquier momento**, por lo tanto, deben ser capaces de recomponerse ante un eventual fallo. Si estás utilizando una cola de mensajes, considera re-encolar los mensajes fallidos para no perder información. Azure re-procesará un mensaje fallido cuándo la función `context.done` es invocada pasando un valor como parámetro. El número de reintentos y el tiempo entre cada ejecucuión puede ser definido en el archivo `host.js`.

También es una buena idea implementar una [estrategía de backoff incremental](https://en.wikipedia.org/wiki/Exponential_backoff) para re-encolar los mensajes luego de una ventana de tiempo incremental. Esto es especialmente útil para evitar que se acumulen errores debido a un servicio externo que está caído o funcionando incorrectamente, por ejemplo.

**¡Valida las entradas de tus funciones!** Puedes implementar [Object Schema Validation](https://json-schema.org/understanding-json-schema/reference/object.html) al inicio de tus funciones. Hay muchas herramientas que hacen esto, en particular puedo recomendar:

- [Joi](https://github.com/sideway/joi).
- [Ajv](https://ajv.js.org/).

**Conoce la Dead Letter Queue (DLQ)**. Azure Service Bus almacena los mensajes en colas hasta que son procesados, pero en caso de que algunos de estos mensajes no puedan ser recibidos por su respectivo subscriptor entonces estos son enviados a la DLQ correspondiente al Topic. La sintaxis a utilizar para acceder a la DLQ de un Topic particular es la siguiente:

`TopicName/Subscriptions/SubscriptionName/$DeadLetterQueue`

## Evitar que tus funciones se llenen de polución

Una de las grandes ventajas de las arquitecturas serverless es que podemos enfocarnos en la lógica de negocio de nuestra solución. Pero, los problemas comienzan cuando debemos lidiar con atributos del código fuera del mismo, como por ejemplo: parseo de entradas, validaciones, serialización, manejo de errores, etc.

Todo este código auxiliar, pero necesario, puede terminar ensuciando nuestra lógica de negocio, volviendola díficil de leer y de mantener. Para estos casos, [Azure Middleware Engine](https://www.npmjs.com/package/azure-middleware) ayuda a los desarrolaldores a **dividir el problema en partes más pequeñas**, isolando la lógica en "pasos" y manteniendo tú código limpio, declarativo y fácil de leer.

:::tip Tip
Escribí un articulo sobre esta herramiente, puedes encontrarlo en el siguiente link: [Improve your Azure Functions with this best practices](/es/blog/azure-functions-middlewares).
:::

Por ejemplo:

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

Links útiles:

- [Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
