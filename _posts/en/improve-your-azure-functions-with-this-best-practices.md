---
title: 'Improve your Azure Functions with this best practices'
excerpt: 'Tips and tricks to move your Azure Functions to the next level in Node.js.'
coverImage: '/assets/blog/improve-your-azure-functions-with-this-best-practices/cover.jpg'
date: '2019-09-23T00:00:00Z'
tags: [backend, serverless, azure functions, nodejs, javascript]
---

## Introduction

This article presents a **collection of good practices working with [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) in Node.js**. Recommendations have been extracted and adapted from Azure documentation and personal experiences.

Although this post will focus on Node.js, good practices presented on it can be useful for any language.

:::info Info
This post was originally published on Medium, you can find it here: [Improve your Azure Functions with this best practices](https://medium.com/@emanuelcasco/improve-your-azure-functions-with-this-best-practices-da8fd0123318).
:::

## TL;DR

- Avoid long running functions.
- Avoid cross-functions communication.
- Share and manage connections.
- Keep functions pure.
- Use an infrastructure orchestrator.
- Write defensive functions.
- Avoid code pollution.

## Avoid long running functions

A function can become large due many dependencies or heavy processing operations. This result in unexpected timeouts and unfinished procedures.
To prevent this, you can:

- Avoid large dependencies whenever possible.
- Refactor large functions into smaller pieces of code that work together and return responses fast.
- Respect the "single responsability principle", each function should have a single responsibility over a single part of the functionality provided by the software.

<img alt="Refactor large functions into smaller pieces of code that work together and return responses fast." src="/assets/blog/improve-your-azure-functions-with-this-best-practices/image01.png" />

For example, imagine you have a HTTP trigger function. HTTP requests usually need a quick response, thus you can pass the HTTP trigger payload into a queue and process it with a queue trigger function

## Avoid cross-functions communication

Azure Functions are not built to manage communication between functions. **Prefer Azure Queue Storage for cross-function communication**. Queue storage gives you asynchronous message queueing for communication between functions.

<img alt="Prefer Azure Queue Storage for cross-function communication." src="/assets/blog/improve-your-azure-functions-with-this-best-practices/image02.png" />

If you need build topologies with complex routing you can use [Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) which helps you to deliver messages to multiple subscribers and filter them before processing. In the other hand, [Events Hubs](https://azure.microsoft.com/en-us/services/event-hubs/) are useful to support high volume communications.

## Share and manage connections

**Creating and destroying instances of a shareable object can hurt performance.** Here are some guidelines to follow when manage connections:
- Reuse client instances rather than creating new ones with each function invocation.
- Create a singleton client and reuse it for every function invocation.
- Maintain this singleton pure.

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

If you want to know more, please visit [Manage connections in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections).

## Keep functions pure

A pure function has two main characteristics:
- Is **stateless**, produces no side effects.
- Is **deterministic**, given the same input, will always return the same output.

**Azure Functions runs in stateless compute containers that are event-triggered**, ephemeral (may last for one invocation), and fully managed by the cloud provider. So it is not recommend storing state within the application itself. Associate any needed state information with your data and store it an external datastore like DocumentDB or Azure SQL.

## Use an infrastructure orchestrator

**Serverless still requires infrastructure management**. Managing serverless infrastructure requires discipline to ensure it can be effectively maintained.

To manage your infrastructure, and keep it documented, it is recommended to use an infrastructure orchestrator. Infrastructure as code is a way of managing your devices and servers. This is done through machine-readable definition files.
Basically, you write down how you want your infrastructure to look like and what code should be run on that infrastructure. A highly recommended tool is [Terraform](https://www.terraform.io/).

## Write defensive functions

**Assume your functions could throw an exception at any time**. They should be able to continue from a previous fail point in the next execution. If you are using a queue to communicate, consider a re-queue strategy in order to not lose information.

Azure will retry to process a failed function input when you pass an error with the `context.done` method. Retries number and time window between them are defined in your `host.js` file.

Also, you can implement a custom [exponential backoff strategy](https://en.wikipedia.org/wiki/Exponential_backoff) to re-queue your messages after an increasing range time. This is especially useful to dispel possible inconveniences caused by high traffic.

**Validate your inputs!** You can implement [Object Schema Validation](https://json-schema.org/understanding-json-schema/reference/object.html)  in your functions before processing inputs. There are great tools out there but I recommend:

- [Joi](https://github.com/sideway/joi), the most widely adopted package for object schema validation. It has a great api and excellent documentation.
- [Ajv](https://ajv.js.org/).

Meet the **Meet the Dead Letter Queue (DLQ)**. Azure Service Bus stores messages in the queues until processed, but there are several reasons for such undelivered messages, like exceeding MaxDeliveryCount, exceeding TimeToLive, errors while processing subscription rules, etc.
What happens with undelivered messages? They are sent to an DLQ.

If you want to access the undelivered message from the Topic then, the syntax of reading the Dead Letter Queue will be:

`TopicName/Subscriptions/SubscriptionName/$DeadLetterQueue`

## Avoid code pollution

Serverless architectures biggest benefit is you can focus on implement your business logic. Problems begin when you have to **deal with common technical concerns outside your business logic**. For example: input parsing and validation, output serialization, error handling, and more.

All this necessary code ends up polluting your business logic, making it harder to read and maintain. [Azure Middleware Engine](https://www.npmjs.com/package/azure-middleware) helps developers to **divide the problem in smaller pieces**, isolating logic into “steps”, keeping your code clean, readable and easy to maintain.

:::tip Tip
I write a post about this tool, you can find it here: [Improve your Azure Functions with this best practices](/en/blog/azure-functions-middlewares).
:::


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

## Wrap up

So, we conclude here. This good practices helped me and my team improve productivity, code quality and functions performance. I hope them benefit you and your team also. Let me know if it were useful to you, and if not you can share your experience with us in the comments.

Useful links:

- [Azure Functions Middleware](https://www.npmjs.com/package/azure-middleware).
