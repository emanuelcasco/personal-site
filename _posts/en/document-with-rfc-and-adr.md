---
title: 'Document your technical decisions using RFC and ADR'
excerpt: 'A brief introduction to the generation of RFC (Request for Comments) and ADR (Architecture Decision Record) documents to iterate and record your technical decisions.'
coverImage: '/assets/blog/document-with-rfc-and-adr/cover.png'
date: '2021-03-31T00:00:00Z'
tags: [documentation, software architecture, software design]
---

## TL;DR

- Use RFCs to create and refine technical proposals, this will improve not only your documentation but your decision making.
- Use ADRs to record a history of your technical decisions to improve the knoledge tranfer in your team.
- It's recommended to implement templates to generate this documents:[Documented Software Decisions](https://github.com/emanuelcasco/document-software-decision-template).

## Introduction

Over a project life-cycle, **a great deal of time is spent in making decisions**, for example: how to design the solution to integrate a new service to our system, data migration from a legacy database, which third-party service use, and so on. The lack of a documentation process that follows the project growth can result in long-term problems, coming back your steps to recall why did you take a decision is usually a complicated task.

The passage of the time and the team rotation without documentation that enables the knowledge transfer results in the lost of lessons learned and valuable experiences. Citing the first lesson of History: **"Those who cannot remember the past are condemned to repeat it."**.

However, as I mentioned before this is a common problem in software development, therefore, there are a lot of possible solutions for it depending of your needs. In this post, I'm going to focus in two particular tools that have helped me in the past:

1. RFC to generate and iterate proposals.
1. ADR to record decisions.

## Request for Comments (RFC) to generate and iterate proposals

RFC usage is as old as the same Internet, or even more because [this tool was used to make decisions in the design of the WWW [World Wide Web](https://www.rfc-editor.org/rfc-index.html), besides, the use of this tool has increased over the last years guided by Open Source projects like [React](https://github.com/reactjs/rfcs) and [Rust](https://github.com/rust-lang/rfcs).

Basically, a RFC (Request for Comments) document **is a written technical proposal intended to encourage the iteration of a solution based on exhaustive analysis and peers feedback**. The objective is to come up the best possible solution for a problem and mitigate the risk of complications at the development, definitely, we are talking about **making better decisions**.

### Life-cycle

1. **Proposal**: Change proposal document is presented.
2. **Iteration**: The proposal is iterated based on feedback to find issues or improvements. At this moment, is possible that we find out the solution is unviable, in that case, the RFC should be marked as ""deprecated.
3. **Implementation**: When the proposal has madured enough then we can close the document and implement the solution.
4. **Maintaining**: Once implemented, the solution may require some modification, in that case you can either modify the original document or update set it as "deprecated" and reference it from a new RFC document with the change proposal.

:::note Note
Is not recommended to modify an already implemented RFC as doint it we reduce its value as "history".
:::

### Examples

- [Notion RFC](https://www.notion.so/RFC-Template-Title-8df1bd0d24b0440486fe133eecdf4a5e).
- [RFC Template | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template/blob/main/rfc/template.md).

## Architectural Decision Records (ADRs) to record decisions

An Architectural Decision Records (ADR) is a document that **record an Architectural Decision**, with its context and consequences. Usually, an ADR is the last step of a full decision making process that included a RFC document creation, but this is not always true.

:::quote Decisión de Arquitectura (Architectural Decision - AD)
_*"Software design related decision that could imply either functional as non-functional requirements and has a **significant** impact over our system architecture."*_
:::

Some ADR benefits are:

- **Improve knowledge transfer** (oboardings or rotations), as the people joining the tean can read the last team decision and infer how it works, and so on.
- **Improve alignment between members**. Unilateral decisions risk is mitigated as all impactfull decisions are consensual.

### When to create an ADR?

To ask this question I like to make reference to the following post from Spotify Engineering blog:

:::quote [Josef Blake (Spotify)](https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/)
_"Always you made a significant decision that impacts how engineers write software."_
:::

What is a "significand decision" is something your team has to decide and depends on the context. There is no golden rule but it is more a construction based on your and your team experience. However, keep in mind the following topics:

- All RFC document must has an ADRTodo documento RFC debería tener un documento namesake ADR.
- If your team take any "significant" in a meeting, it must be reflected in your ADRs.

Following links include RFC examples and tools:

- [ADR Tools | Nat Pryce](https://github.com/npryce/adr-tools).
- [ADR | GitHub](https://adr.github.io/).
- [ADR Examples | Joel Parker Henderson](https://github.com/npryce/adr-tools).
- [ADR Template | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template/blob/main/adr/template.md).

## Last considerations

The adoption of these tools in your team could not be easy, documentation process are often a conflict point in the engineering teams. My first advide would be: be patient. **It is necessary, for this process to work, that your team get involved in it**.

### First Steps

- **KISS** (Keep It Stupid Simple), **it is important to keep the documentation metodology as simple as posible in order to succeed.**
- **The process must adapt your team, not the other way around**.
- **Take the first step.**. Once the tools and the platform your team is going to use to write the documents, it is a good idea to create the first documents as a reference for the rest of the team. You could even write a document recording that you decided to write documentes using RFC and ADR.
- Also **is a good idea to create templates for your documents**, or an script to generate them. The [following link](https://github.com/emanuelcasco/document-software-decision-template) includes some documents templates.

### Graphic guide of when and how to document

![Diagram Flow to document](/assets/blog/document-with-rfc-and-adr/image01.png)

## Conclusions

That's all for now! Hopefully this post has been helpful to you, below you will find a list with usefull resources in case you are interested in continuing reading about these topics:

- [Templates | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template).
- [When should I write an ADR? | Spotify Engineering Blog](~https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/~).
- [ADR Tools | Nat Pryce](https://github.com/npryce/adr-tools).
- [ADR | GitHub](https://adr.github.io/).
- [ADR Examples | Joel Parker Henderson](https://github.com/npryce/adr-tools).
