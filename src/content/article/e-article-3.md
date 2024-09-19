---
title: The Wonders of Parallelization
author: Eli Newlin
date: 08/19/2024
img: https://imgur.com/a/qvUPCbJ
---

### The Wonders of Parallelization

Programs written in either your free time or your typical college course 
always run incredibly fast; I've found it scarce that a terminal doesn't immediately output, even when running a project that took all semester to create. However, I've reached a never-before-seen issue in one of my most recent classes. Computation-heavy and, as a result, slow code.

## What Is The Source of This Tortoise-like Performance?

Taking a few seconds for code to run is understandable. However ...
almost 4 hours is another story entirely. The program causing this snail mail level speed is a ray tracing engine for my Computer Graphics class. Ray Tracing itself has never been incredibly fast. Even the quickest gaming desktops struggle to get acceptable frame rates with this graphics technique. Given this fact, pairing such a taxing process with a single laptop with a single core is a bad 220-minute idea. So, while not stated in the curriculum, I decided to reduce this processing time ASAP.

## Who is The Culprit?

Before I can explain how I utilized threads to speed this up, we must understand where most of the slowdown occurs. My engine renders an image like so. First, the scanline at row 0 begins to be processed from left to right. Then, to ensure the image is smooth and pretty, anti-aliasing takes effect by sampling surrounding pixels (the number of which is determined before the render call); after sampling, the pixel's color is calculated, and the process continues line by line.

## Where Can We Speed Things Up?

The scanlines are not dependent on each other to render so that's where we should split tasks up, but how do we make sure that lines are still rendered in order? One could only move towards the tried and true array of course! Using a 2d array initialized as the same size as the image (arr[image_width][image_height]), we can then store each pixel in the said array when all lines have been rendered. A loop can go through the array and output to a file with the pixels in order. That way, a thread can finish rendering a line before or after its neighbors, and our production will be in order and smooth. Now that we've targeted our problem area, we can utilize multi-threading.

## Implementation

Using a Thread Pool, we can assign each scanline as a "task" in a queue. Then, after setting up our threads, we can have each take a task, process it, put the result in its appropriate location, and move on to the following line. After the queue of tasks is empty, we can loop through the output array and view our image!! Using the same laptop with 16 threads available, we can reduce the processing time of the same image from 220 minutes to just 40 minutes! I was shocked at this speed, as initially,
I thought that I would need to bring in a GPU to get to under one hour.

## Final Thoughts

I am incredibly impressed with the power of multi-threading and so happy I decided to delve into this topic. I'm also surprised that it took until my Senior Year of college even to have a program that could benefit from using more than one thread! Moving forward, I plan to squeeze even more performance out of my engine, which would mean including the GPU to try and speed up the more laborious calculations, but I fear I will have to wait a little longer before doing so. This is because I plan to add more functionality and would rather not dig deep into the engine if it means I will have to rewire it all again. Therefore, surface-level multi-threading will have to do for now, but I can't wait to lower that runtime even more by the end of the semester.
