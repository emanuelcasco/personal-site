---
title: 'Implementando middlewares en Azure Functions'
excerpt: 'Aprendé a implementar "middlewares" en tus Azure Functions para mantener tu lógica de negocio limpia y escribir tus funciones de forma más declarativa.'
coverImage: '/assets/blog/azure-functions-middlewares/cover.png'
date: '2019-01-04T00:00:00Z'
tags: [backend, serverless, azure functions, nodejs, javascript]
---

## Introducción

Escribí este post para compartir mi experiencia implementando middlewares en Azure Functions. Azure Functions es un servicio de computo serverless, similar a AWS Lambda, que permite ejecutar código on-demand sin tener que manejar infraestructura explícitamente.

La gran ventaja de la arquitectura serverless es que permite enfocarse en construir apps y no preocuparse por proveer o manejar servidores, permitiendo poder concentrarse solo en lo que de verdad importa para el negocio.

Pero en aplicaciones reales, hay que lidiar con asuntos técnicos que escapan de la lógica de negocio, cómo validaciones, parseo de entradas, serialización, manejo de errores, etc. Todo este código auxiliar suele terminar ensuciando nuestra lógica, volviendo nuestras funciones más difíciles de leer y mantener.

:::info Info
Publique este post originalmente en Medium, puedes encontrarlo en el siguiente link: [Implement middleware pattern in Azure Functions](https://javascript.plainenglish.io/implement-middleware-pattern-in-azure-functions-d8e9f94626a5)
:::

## Solución

Web frameworks, como Express, Fastify or Hapi, han solucionado este problema usando el patron middlewares. Este permite a los desarrolladores abstraer estas tareas técnicas en pequeños “pasos” que decoran la lógica de negocio principal.

Luego de decidirme a implementar este patron en mi proyecto realice una pequeña búsqueda para comprobar si alguien ya había implementado una solución similar. Desafortunadamente, las pocas soluciones que halle no eran lo satisfacían mis necesidades, por lo que decidí implementar mi propia solución.

**Así es cómo Azure-Middleware nació.**

Links útiles:

- [NPM: Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
- [GitHub: Azure Functions Middleware](https://github.com/emanuelcasco/azure-middleware).

## ¿Cómo funciona?

### Validación

En arquitecturas *serverless* es esencial poder determinar el correcto funcionamiento de cada función como una pieza de código independiente. Por lo tanto, y para evitar comportamientos inesperados, es importante asegurar que las entradas de la función pertenezcan a su dominio.

Para lograr esta misión, Azure-Middleware utiliza [Joi](https://github.com/sideway/joi). Este nos permite definir esquemas y comprobar si los mensajes de entrada son o no validos. Con el método `validate` puedes definir el esquema que será usado para validar los mensajes. Si la función es llamada con un mensaje invalido entonces se lanzara una excepción y la función no sera ejecutada.

```js
module.exports = new MiddlewareHandler()
   .validate(invalidJoiSchema)
   .use(functionHandler)
   .catch(errorHandler)
   .listen();
```

### Encadenado de funciones (function chaining)

El método `use` es usado para encadenar los distintos middlewares, o function handlers, cómo "pasos". Cada middleware es ejecutado secuencialmente en el orden en que la función fue definida. El flujo de información salta de un elemento de la cadena al siguiente al llamar al método `context.next`.

```js
module.exports = new MiddlewareHandler()
   .validate(schema)
   .use((ctx, msg) => {
      ctx.log.info('Print first');
      ctx.next();
   })
   .use((ctx, msg) => {
      ctx.log.info('Print second');
      ctx.done();
   })
   .catch(errorHandler)
   .listen();
```

El método `next` es inyectado en el contexto y es usado para iterar en la cadena de middlewares.

### Manejo de errores

El manejo de errores en Azure-Middleware es muy similar a como funcionan web frameworks como Express. Cuando una excepción es lanzada, el primer error handler en la cadena de middlewares es ejecutado. Mientras que los function handlers anteriores serán ignorados.

También, es posible saltar el siguiente error handler usando context.next. Si este método es recibe un valor no nulo cómo primer argumento entonces el mismo será tratado como un error. A diferencia de los function handlers, los error handlers reciben un error como primer argumento (además del context y la entrada).

```js
module.exports = new MiddlewareHandler()
   .use((ctx, msg) => {
      ctx.log.info('Hello world');
      ctx.next('ERROR!');
   })
   .use((ctx, msg) => {
      ctx.log.info('Not executed :(');
      ctx.next();
   })
   .catch((error, ctx, msg) => {
      ctx.log.info(errors); // ERROR!
      ctx.next();
   })
   .listen();
```

## En resumen

Este paquete sigue en desarrollo y tengo algunas ideas para mejorarlo. Sin embargo, si tienes alguna sugerencia por favor no dudes en ponerte en contacto conmigo y hacérmelo saber.

Links:
- [Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
