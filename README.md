## Issues

When using webcontainers, all requests made to external resources are proxied through Stackblitz's proxy. Therefore, whenever I try to pull 
any tar from the internet when installing and building packages, they fail.

In order to get the profiler working, I need the node profiler binary specific for the linux architecture the container is running. It usually comes straight
out of the box when you pull the v8-profiler-next package, but since the requests are proxied, the binary cannot be downloaded.

One way to resolve this issue, is to create an npm package with the binary serialized in a sepcific format and deserialize it in the container.
This would obviously require a lot more bandwitch and processing power, but I cannot figure out any other way how to bypass the CORS issue.

