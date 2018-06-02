# Reddit promotion handler
I don't like new Reddit layout promotion blocks,    
I always get tricked into thinking they're real posts.  

My solution - a bodge javascript to find and mark them. Like RES, but worse.

# Usage
Copy the contents of the script into your dev console and apply them.

Or

Copy the contents of the script into an extension that will run it every time you open Reddit, e.g. ["Custom Style Script"](https://chrome.google.com/webstore/detail/custom-style-script/ecjfaoeopefafjpdgnfcjnhinpbldjij?hl=en)

# Functionality
* Marks promotions in new Reddit layout
* Just one javascript file (a requirement for it to be a good bodge)
* Will break if they change the name "promoted" to "promotion" or smth
* Will break if they change the class of the post wrapper (scrollerItem)
* Will break if jQuery CDN is broken (Tbh, if that happens, probably the apocalypse has started)
* Will break if used in IE11 or Opera mini (Because of template literals, don't care - bodge, yo)
