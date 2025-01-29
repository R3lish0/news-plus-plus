---
title: Why Use One Language When You Can Use Two?
author: Eli Newlin
date: 01/28/2025
img: https://i.imgur.com/Eu0lxSm.jpeg
---

## A Project Begins

There are many, and I mean MANY, different programming languages available to the modern developer. Javascript, Python, C++, Java, C# and those are just the most popular. That being said, this is not without reason. As new needs develop, sometimes a language doesn't fit well enough into the use case. That's how languages such as Typescript, Kotlin, and Scala started. When trying to accomplish a project/task, you should pick the right tool for the job. Yet, what do you do if there isn't a language covering the features you need/want and you don't have time to create your own language? Simple, use two.

## Is This Article Theoretical?

No, this is not just a theory; it's easy to talk about possibilities without putting any real work behind it, so I want to practice what I preach and use two languages to simplify/reduce complexity in a task. Therefore, this article will be different than usual, as it will follow a journey of implementing this feature on one of my existing projects.

## Entrypoint

First, we have to decide where to begin; in terms of languages to use, I decided on using Lua in conjunction with C++, a potent combo that combines interpreted scripting and bare metal programming to accomplish incredible feats. This combo is not new, it's the favorite configuring method of Neovim users, as well as used in game frameworks such as Love2d. Yet, to start this project for myself, I needed a C/C++ project to build a Lua configuration tool. I thought about simple projects like a classic calculator or todo app, but I wanted my Lua "frontend" to have an impactful tool behind it, and then it hit me—my Raytracing Engine.

## Existing Project

During my last semester at Iowa State, I created a [Raytracing Engine (found here)](https://github.com/R3lish0/RenderingEngine); it uses the teaching of the book trilogy *Ray Tracing In a Weekend* to create a multi-threaded raytracing engine capable of meshes, all sorts of materials and plenty of fun. However, one thing that rained on my graphics parade was the actual making of the scenes. Configuring the scenes in C++ leads to some pretty painstaking code such as this,

```cpp
    //Materials
    auto red   = make_shared<lambertian>(color(.65, .05, .05));
    auto white = make_shared<lambertian>(color(.73, .73, .73));
    auto green = make_shared<lambertian>(color(.12, .45, .15));
    auto light = make_shared<diffuse_light>(color(15, 15, 15));

    // Cornell box sides
    world.add(make_shared<quad>(point3(555,0,0), vec3(0,0,555), vec3(0,555,0), green));
    world.add(make_shared<quad>(point3(0,0,555), vec3(0,0,-555), vec3(0,555,0), red));
    world.add(make_shared<quad>(point3(0,555,0), vec3(555,0,0), vec3(0,0,555), white));
    world.add(make_shared<quad>(point3(0,0,555), vec3(555,0,0), vec3(0,0,-555), white));
    world.add(make_shared<quad>(point3(555,0,555), vec3(-555,0,0), vec3(0,555,0), white));

    // Light
    world.add(make_shared<quad>(point3(213,554,227), vec3(130,0,0), vec3(0,0,105), light));

    // Box
    shared_ptr<hittable> box1 = box(point3(0,0,0), point3(165,330,165), white);
    box1 = make_shared<rotate_y>(box1, 15);
    box1 = make_shared<translate>(box1, vec3(265,0,295));
    world.add(box1);

    // Glass Sphere
    auto glass = make_shared<dielectric>(1.5);
    world.add(make_shared<sphere>(point3(190,90,190), 90, glass));
```

It's not exactly complex, but tedious to write nonetheless. It's a perfect match for my soon-to-be Lua frontend. However, at this point, I have never coded in Lua, and I've never even seen any Lua code aside from blindly copying some Neovim configs. So, the first step was clear: I needed to learn Lua.

## Learning Lua

Luckily for me, I know a good amount of language to *almost* completion, I'm familiar with C/C++, Java, Javascript/Typescript, and Python. Therefore, all I needed to see were some functions, if-statements, and variable syntax, and we were off to the races. Now that I had Lua *somewhat* figured out, I had to learn how it interacts with C++, which was extremely pleasant, to say the least.

When installing Lua, you will have access to a file called **lua.hpp**; once you find its location, it's as simple as linking it’s directory during the compile process like so, and that it.

```bash
g++-14 -I./include -std=c++17 -o3 -I/opt/homebrew/Cellar/lua/5.4.7/include/lua -c ./src/main.cc -o ./make/main.o
```

## A Well Oiled Machine

My C++ code that manages scenes will be the only thing that has its responsibility handed to Lua. The **main.cc** file creates objects with values such as material, position, size, etc. That being the case, Lua needs to make these objects, pass them to C++, and then the rendering engine will take care of the rest. But how do data structures get passed between the languages? The answer is a shared stack between the two, allowing either side to push or pop variables/data onto the stack. That means all I need to do is create objects in Lua, push each Table (Lua's all-purpose data structure) onto the stack, then have C++ parse through, determine what is being created, and pass that information to the engine. Which allows our Lua code to look a little like this,

```lua
    -- Everforest Materials
    local forest_ground = {"lambertian", {0.15, 0.2, 0.1}} -- Dark mossy green
    local bark = {"lambertian", {0.25, 0.15, 0.1}}  -- Deep brown bark
    local leaves = {"lambertian", {0.12, 0.22, 0.08}}  -- Dark forest green
    local water = {"metal", {0.2, 0.3, 0.35}, 0.1} -- Slightly blue, very smooth metal for water
    local river_bottom = {"lambertian", {0.08, 0.12, 0.18}} -- Very dark blue bottom
    local glass = {"dielectric", 1.5} -- Glass duh
    local glow = {"diffuse_light", {8.0, 6.0, 2.0}, 0.4} -- fireflies
    local sunset = {"diffuse_light", {2.0, 1.0, 0.4}, 0.6}  -- sun

    -- Add materials to global table
    table.insert(Materials, {"forest_ground", table.unpack(forest_ground)})
    table.insert(Materials, {"bark", table.unpack(bark)})
    table.insert(Materials, {"leaves", table.unpack(leaves)})
    table.insert(Materials, {"water", table.unpack(water)})
    table.insert(Materials, {"river_bottom", table.unpack(river_bottom)})
    table.insert(Materials, {"glass", table.unpack(glass)})
    table.insert(Materials, {"glow", table.unpack(glow)})
    table.insert(Materials, {"sunset", table.unpack(sunset)})
```

The code is somewhat similar. However, this is just the start. C++ is a very powerful language, but when it comes to connecting to other technologies and tools for the user, it gets a little complicated given that low-level languages and user interfaces are not exactly best friends; however, now that I have a very friendly interpretation layer on top, I can start doing some cool things with this engine. So what's next?

## Next Steps

I can leverage my desire to write to help me learn new skills and tools, with the reverse also being true. This project makes me feel inspired, and I have thought of some cool things to do with it, so I will lay out the plans so you can know what to expect in the upcoming articles, although I may put more normal articles in between updates depending on my workload.

### I plan to do the following:

- Create a TUI using Lua so users won't even have to code right to create some pretty pictures, though I imagine for the more complex scenes; it might be necessary to script the images

- Revamp the engine to use the GPU instead of the CPU

    - While multithreading the CPU reduced render time significantly, I want to dip into writing some GPU shaders not only to learn but to reduce the time of rendering even further

- Love2d frontend (See why the Lua layer was important?)

    - This is the last stage in the project, which will work with Love2d to create a game where players can play the game, and while that happens, a scene is derived from their gameplay, after which an image is generated from their efforts

    - This is a way to say that every solution to a problem is art in its own way, and provides users with not only an incentive to play the game differently but also makes watching someone play and playing yourself an entirely new experience

Overall, I'm very excited about this project and excited to update everyone along the way. For every one that made it to the end, here's a little secret: the image for this article is the first image rendered with the new C++/Lua combo.

Excited to learn,

Eli