# PoC Memory Allocation

This Proof of Concept arose from the need to easily demonstrate how memory is allocated in JavaScript. My idea was to replicate Chrome DevTools' memory allocation graph, which compares allocated objects in the heap at different steps in your code. Imagine a fully client-side debugger that, instead of showing how values change, reveals how memory is being allocated.

Good idea, right? I thought so too. But it turns out that achieving this is nearly impossible with the current state of "Node in the browser." The folks at StackBlitz haven’t open-sourced WebContainers yet and have patched system calls to proxy all requests through their servers, which causes CORS issues unless you pay for their proprietary CORS proxy.

I’m not willing to pay for that, at least not until I’ve validated that this idea is viable. Nor do I want to spend my time patching a Linux container, which could easily get replaced with a new version that breaks everything again.

The v8-profiler-node8 package wraps v8-profiler-next, which supports memory profiling and reading heap snapshots. My plan was to use this to capture heap snapshots at each step in the code, then diff them to visualize memory allocation.

However, v8-profiler-next relies on a native addon, which needs to be pulled for the target platform—it’s essentially the Node.js profiler. But, as I mentioned earlier, because StackBlitz proxies all outgoing requests through their server, the packages are installed without the required files.

To work around this, I manually fetched the file, encoded it to base64, and pushed it to an [npm package](https://www.npmjs.com/package/linux-node-profiler-encoded?activeTab=readme). Another approach could be to paste the base64 value directly into the code string you pass to the container or use a bundler to manage dependencies and structure the repository properly. In my case, I dumped everything into a webEnv.js file and fetched the base64-encoded dependency externally.

As you might guess, I then decoded the base64 string and wrote the ELF file to the appropriate location.

But, surprise! Native addons aren’t allowed in the StackBlitz container.

I tried launching the script with node --no-addons=false, but that didn’t work. I even attempted to spawn a child process, hoping it might bypass the permission model (which, by the way, would be a major security flaw if it did), but fortunately, that didn’t work either.
