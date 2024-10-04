# PoC Memory Allocation

This PoC stems from the need to easily showcase how memory is allocated in JavaScript and my idea was to replicate Chrome's DevTools memory allocation graph which 
will diff the allocated objects in the heap between each step in your code. Imagine a debugger that instead of how your values change, it shows how your memory is allocated.

Good idea, yeah? Well, I thought so too but it's impossible to pull off with the current state of "Node in the browser". The friends in StackBlitz have not open sourced
webcontainers yet and have somehow managed to patch the syscalls to proxy all requests to their server, hence causing CORS issues if you don't pay for their proprietary CORS proxy.

I don't want to pay, not before I have validated this idea can sustain itself. Neither do I want to spend my whole time trying to patch a linux container which could easily get swapped
out for a new version with a different patch.

The `v8-profiler-node8` package provides a wrapper on top of `v8-profiler-next` which provides support for profiling memory and reading the heap snapshots. My idea was to use this to take
snapshots of the heap at each step in the code and then diff them to show how memory is allocated. 

Nevertheless, the node process which was spawned by the StackBlitz container is by default not allowing 
