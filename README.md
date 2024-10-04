## Issues

When using webcontainers, all requests made to external resources are proxied through Stackblitz's proxy. Therefore, whenever I try to pullany
any tar from the internet when installing and building packages, they fail.
In order to get the profiler working, I need the .profiler binary specific for the linux architecture the container is running but it doesn't come
with the npm v8-profiler-next dependencies because CORS is blocking the download.
