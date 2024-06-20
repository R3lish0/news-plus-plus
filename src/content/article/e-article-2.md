---
title: Linux + Nvidia Is Secretly Getting Better 
author: Eli Newlin
date: 06/19/2024
img: https://i.imgur.com/QZYQtN0.jpeg
---

There is no joke older in Linux than the constant fight between a Linux user and their Nvidia graphics card. Only one or two years ago, it took significant effort to get Nvidia cards working with sometimes no success, even when following steps correctly.

Yet recently, silent progress has become quite loud in the past year with multiple Linux distributions; I'm excited to see that using a Nvidia card has become significantly less daunting.

### What Makes Nvidia The Enemy of The Linux Desktop?

Linux, while sometimes behind the latest and greatest advancements in technology; due to lacking the development power (and money) that Microsoft or Apple has at their disposal, is a fast-moving and ever-changing operating system. With a multitude of kernels being used in different distributions as well as a large number of desktop environments being available to Linux computers. Because of this, many variables go into making a driver work with every configuration possible in a Linux environment.

Luckily, a majority of software on Linux is open-source. Therefore, the responsibility to fix bugs and add features is only partially on the company that maintains that software/package. Suppose a maintainer is lagging in development. In that case, the talented Linux community can take some of the load off that maintainer's shoulders to advance the software and keep Linux progressing.

Official Nvidia drivers, however, are **NOT** open-source.

Linux users with Nvidia cards are forced to wait for the development of a large company that sadly has their Linux development frequently pushed aside in favor of greater, more profitable ventures. This makes it very frustrating to encounter a problem with little hope of getting a fix anytime soon, but hopes are rising in the Linux community.

### Good News On The Horizon 

While official Nvidia drivers are still proprietary, there have been leaps and bounds in terms of installing official drivers. Initially you would have to install packages, edit your grub, then reboot and pray that everything doesn't break. Nowadays, some distributions such as *Void Linux*, are as easy as, installing a single package, *Ubuntu* has a GUI to install drivers, and *Fedora* has a pretty straightforward process to get users up and running smoothly and easily.

Something promising on the open-source front is the Nouveau drivers, which have made multiple leaps and bounds to catch up with its proprietary counterpart. While it is still far behind on the gaming side, Nouveau drivers can make any laptop with an Nvidia card function well in most desktop applications, and the good news continues.


### A Very Optimistic Future

Red Hat recently announced it will begin developing a successor to the Nouveau drivers called Nova. This new Nvidia driver will be open-source and made with Rust. Given that Nova will be created with newer graphics cards in mind, it can be created without the ancient architecture that Nouveau is built on. In addition, Rust is quickly becoming a favorable language due to its speed and memory safety. The maintainer of Nouveau has stepped down, so the timing couldn't be better for a new player to take the stage and make Nvidia graphics cards play just a bit nicer with the Linux desktop.