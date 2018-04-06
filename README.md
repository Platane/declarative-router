# declarative-router

Attempt to build a simple solution to handle routing.

# why

I think parts of the router should not be tied to the dom, nor to react. It make ssr as well as testing too complicated.

# Usage

The router is composed of:
 - **route resolver**. Which given a list of valid routes and an url, is able to determine the current route.
 
 - **navigator** which talks to the browser API to read / write the url.
 
 - **react stuff** which should somehow inject the route info.
 
 - **react utilities component** such as a link component.

