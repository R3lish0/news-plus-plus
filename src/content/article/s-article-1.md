---
title: Graphics Package Upgrade
author: Seth Traman
date: 08/10/2024
img: https://i.imgur.com/eGqEDEi.jpeg 
---

# GPU: Graphics Package Upgrade

Hello from Seth!  I make games and simulations using code.

- [The Grove](https://github.com/stickyfingies/grove) is a browser game
- [Gengine](https://github.com/stickyfingies/gengine) is a desktop app

#### The Grove

A shallow application that pushes the definition of "video game" to its lower limit.  T.G. originally used [Three.js](https://threejs.org) to render the game, and over time this became a larger, more complex rendering framework as i integrated custom functionality to solve game needs.

#### Gengine

This bare-bones 3D simulation engine renders scenes by communicating directly with the GPU using the Vulkan API, which is notoriously complex.  The simplest functionality you expect from a 3D renderer can easily take several hundred lines of code to implement.

## Unifying the Renderer

I want to unify the rendering frameworks from both Gengine and The Grove into a single graphics package that respects a few core ideas:

- **Cross-platform:** a single library or framework to render scenes both in both native- and browser- based environments.
- **Performance:** while browsers typically cannot use high-tech GPU features, I want to make these features accessible to the native and desktop use-cases.

Achieved by following a "write once, run anywhere" software development methodology.  The updated graphics package would be written in C++ so native targets are supported by default.  Additional tooling is required for compiling to WebAssembly, a portable compilation target for running C++ in the web browser.  Unit tests and CI/CD will play a critical role in ensuring the C++ codebase is compiled into WASM and behaves correctly.

To interface with the GPU on browser and desktop, I'm going to use the OpenGL interface for communicating with the driver.  Thankfully, when compiling to WebAssembly there are tools for "transpiling" graphics function calls from OpenGL into WebGL, which is a widely-supported GPU interface for web browsers.

### Getting Started

First, we should understand how the Grove and Gengine rendering frameworks overlap, and identify any jarring differences that should be reconsiled in this new graphics package.

#### Architecture Today

The Grove's renderer exposes the following interface:
- `init(drawing_surface)`
- `loadModel(path) -> model`
- `addObject(model)`
- `removeObject(model)`
- `render()`

Gengine's renderer exposes the following interface:
- `create(drawing_surface)`
- `create_geometry(geometry_data) -> geometry`
	- `destroy_geometry(geometry)`
- `create_image(data) -> image`
	- `destroy_image(image)`
- `create_shader(path) -> shader`
	- `destroy_shader(shader)`
- `create_material(shader, image) -> material`
	- `destroy_material(material)`
- `render(shader, geometry, material)`

Let's examine how these interfaces are similar and different.

#### Both: init/create

Both frameworks expose a method for setting up the renderer and supplying it with a surface onto which it should draw things.  Because both frameworks have similar interfaces for this, I expect little refactoring work in the surrounding application code when migrating to the new renderer.

#### Grove: loadModel

The Grove's renderer is responsible for creating fully-furnished "models," which are basically just renderable shapes.  Models have a geometry that describes their shape, and a material that describes their color, texture, reflectivity, etc.  The Grove's rendering framework assembles this model from developer-provided paths to geometry and material files, usually located on the network somewhere.

#### Gengine: create geometry, image, shader, material

Unlike The Grove, the Gengine rendering framework does not have fully-furnished "models" that can be drawn all by themselves.  Instead, each piece of information about a renderable model is created and kept separately, and only combined when it's time to draw everything.

This makes the application developer responsible for managing the relationships between all this data, i.e. tracking which combinations of geometries and materials should ultimately be rendered as models on the screen.

#### Grove: add object, remove object

The Grove's rendering framework maintains an internal collection of all models that should be drawn on the screen at once, called a "Scene."  After loading a model from the network with the `loadModel` function, the developer can opt-in to rendering that model using the `addObject` function.

Any model can be loaded, modified if needed, and then added to the scene any number of times.  If the application doesn't wish to render that model anymore, it should be removed from the scene using the `removeObject` function.

#### Grove: render

This function renders every model in the scene as a batch operation, using whatever shader program is provided by Three.js.

#### Gengine: render

This function renders a single model (i.e. a pair of geometry and material) using a shader program.

## Next Steps

I'm tired of writing.  Stay tuned for a "Part 2" where I describe how to reconcile the architectural differences between Gengine and The Grove.
