---
title: Is Starting Fresh Easier than Maintaining an Existing Codebase?
author: Eli Newlin
date: 01/21/2025
img: https://i.imgur.com/gvEH9MC.jpeg
---



There is a lot of software that goes into making a finished project. Even simple projects have a collection of libraries and files working in tandem to provide a user experience or accomplish some task. However, throughout all the projects I started and the work experience I have under my belt, I've come to understand something. Starting something from scratch and modifying an existing codebase are entirely different beasts. The code differs in complexity, the structure is either undefined or set in stone, and adding new libraries is a different experience. This article aims to compare and contrast the developer experience when developing by illustrating the drawbacks and benefits of starting from scratch or adding to an existing codebase.

## Simplicity

For one, starting fresh comes with an empty directory; there is nothing but possibilities and a problem ahead of you. How will you solve it? What tech stack will you use? Typically, as projects develop, there are more layers of middleware, more checks internally you must run during the process, and more technological toes to step on when implementing a feature. However, when starting fresh, the entirety of the project is still undefined. This allows for quick pivots in processes and more direct paths to success.

One could make the argument that a well-made project also has a straightforward path to success given the maintainers/creators have a well-structured system, but that is not something that is guaranteed; getting placed in a poorly maintained codebase is my nightmare and one that I have lived more often that maybe I should have.

However, when starting fresh, one can't be reckless; you have to think before you act, given that you are setting the precedent of structure for the following developers or just a future you, as I'm sure many have noticed, good structure is not only crucial to get the job done, but also to communicate common themes for adding new features in the future.

## Structure

A significant benefit of a well-made codebase is its structure. Well-structured codebases are a delight to work with. Primarily because in an existing codebase, most decisions are made for you already. API calls go in **this** directory, anything related to this feature is held within **this** directory, and so forth. Good structure is crucial to the maintainability of a codebase and its ability to support new features down the line. That structure also helps set guidelines for new developers, who can see the patterns of development and then follow suit. If everyone does their part in understanding a system, adding new features can be a breeze, mainly because new developers can learn from example, building new skills by viewing the code written by more experienced developers before them. On the other hand, there is no well-worn path when creating something new.

There is no standard practice when starting from scratch, meaning you must make design decisions yourself. This is where new developers' lack of experience may show. One of the significant quirks of programming is that there are multiple ways to solve the same problem. However, while it may work, that does not necessarily mean the problem was solved *well.* I have often solved a problem on my own, had a working solution, then, upon seeing someone else's, realized "I could have accomplished this a lot better."

Whether it is sloppy code or a sub-optimal way to sort files, keeping your code clean and organized is essential. That being said, when starting from scratch, you need to be conscious of this. **YOU** are setting the precedent, **YOU** are setting the standard, so it is essential to think before you act. A good structure can set a project up for success down the line. However, even the best-structured code can fail to add new features swiftly, given that extensive libraries are being used (npm or pip).

## Libraries

Libraries are a fantastic way to get your code moving faster. A community of software engineers or hobbyist programmers working to create an extensive collection of scripts and tools that make everyone's lives easier. Be it React, AWS SDK, or any third-party library. A project can get started incredibly fast, thanks to these packages. But what happens when an existing codebase over a year old needs to add a new package/library. Dependency Hell. **This** package requires a specific version of **that** package, but updating **that** package breaks a dependency on **another** package.

When adding new libraries to the ecosystem, one must be incredibly careful; worst case scenario, code that initially worked with a package no longer works with the updated version and must now be rewritten.

A brand new project, on the other hand, feels like a breath of fresh air. Install any package you want with the most recent version; everything will work perfectly. Everything works; you get all the new features of new versions with none of the hassles, and everything will be perfect, right? Not entirely, like structure, you have to take some serious time to think about what tools you want to use, pick wrong, and a crucial package may get depreciated **early on enough** to require changing your whole project but **late enough** for it to be a severe pain. Through my work experience and working with projects, I've begun to see the appeal of LTS software (Long-term support), which is guaranteed to receive stable updates for long periods. Nevertheless, the decisions made during development will significantly affect the ease of further work on a project/product.

## Common Theme?

Overall, there are drawbacks and benefits to either stage of a codebase, yet a theme has made itself abundantly clear. For starting anew, one can move fast and be very flexible when getting something started, but in addition to that, careful consideration must be made with the future of the codebase in mind. Lack of planning can cause a codebase with a crumbling, flimsy foundation and could eventually lead to having to redo the codebase entirely, given the codebase crumbles under technical debt.

Everything must be intentional and well constructed, from the tech stack to design decisions, to ensure the codebase lives to see another generation of developers.

On the other hand, an existing codebase can take much of the planning out of the solution; with well-defined coding practices and an organized codebase, new features can be a breeze. However, working with out-of-date or depreciated packages can prove problematic if adding a new package shakes up the current collection of packages. The ease of development may not be tied directly to the age of the codebase but the choices made at any given stage. Therefore, as developers, we must be conscious of our design choices. While they may not directly affect us, they will undoubtedly be another person's headache in the future, maybe even our own.