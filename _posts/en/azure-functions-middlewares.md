---
title: 'Implement middleware pattern in Azure Functions'
excerpt: 'Learn to implement the "middleware" pattern in "Azure Function" to keep your business logic clean and write your functions in a more declarative way.'
coverImage: '/assets/blog/azure-functions-middlewares/cover.png'
date: '2019-01-04T00:00:00Z'
tags: [backend, serverless, azure functions, nodejs, javascript]
---

## Introduction

I wrote this post to share my experience implementing **middleware pattern** in [Azure Functions](https://azure.microsoft.com/en-us/services/functions/).

Biggest advantage of serverless computing is that you can focus on building apps and don’t worry about provisioning or maintaining servers. **You can write code only for what truly matters to your business**.

But in real world applications you have to deal with some common technical concerns outside business logic, like input parsing and validation, output serialization, error handling, and more. All this necessary code ends up polluting the pure business logic code in your functions, making the code harder to read and to maintain.

:::info Info
I published this post originally on Medium, you can find it here: [Implement middleware pattern in Azure Functions](https://javascript.plainenglish.io/implement-middleware-pattern-in-azure-functions-d8e9f94626a5).
:::

## Implementation

Web frameworks, like Express, Fastify or Hapi, has solved this problem using the middleware pattern. This pattern allows developers to isolate these common technical concerns into "steps" that decorate the main business logic code.

After deciding to implement this pattern in my project, I made a small search to check if someone had already implemented a similar solution.
Unfortunately, the few solutions I found didn‘t meet my needs, so I decided to implement it myself.

**That’s is how Azure-Middleware was born.**

See more:

- [NPM: Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
- [GitHub: Azure Functions Middleware](https://github.com/emanuelcasco/azure-middleware).

## How it works

### Validation

In serverless arquitectures is essential to be able to determine the correct behavior of each function as separate pieces of code. Therefore, in order to avoid unexpected behaviors, is important ensure that function inputs belong to its domain.

To accomplish this mission Azure-Middleware uses Joi. It allows us to define a schema and check if the input message is valid or not.
With the validate method you can define the scheme that will be used to validate the messages. If your function is called with an invalid message then an exception will be thrown and your function won’t be executed.

```js
module.exports = new MiddlewareHandler()
   .validate(invalidJoiSchema)
   .use(functionHandler)
   .catch(errorHandler)
   .listen();
```

### Function chaining

The `use` method is used to chain different function handlers, or middlewares, as "steps". It expect a function handler as argument.
Each middleware is executed sequentially in the order in which the function was defined. Information flow passes to the next element of the chain when calling `context.next`.

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

`next` is a method injected into context. It is used to iterate the middlewares chain.

### Error handling

Error handling is very similar as it works in web frameworks like Express. When an exception is thrown, the first error handler into the middlewares chain will be executed. While all function handlers before will be ignored.

Also, you can jump to the next error handler using context.next. If this method receives a non-nil value as first argument, it will be handled as an error. Unlike the function handlers, the error handlers receive an error as the first argument.

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

## Wrap up

The package is still in development and I have some ideas to improve it. However, if you have any suggestion, please don’t doubt in contact me and let me know about it!

Links:
- [Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
