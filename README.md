# polygonMaskJS

##Overview
polygonMaskJS is a simple jQuery plugin that utilizes SVG clipping paths to create seamless slanted backgrounds for full-width banners. polygonMaskJS is unique in that it is 100% responsive, lightweight, and easy to set up.

### Platform support
polygonMaskJS is currently supported on any browser that supports SVG clip paths. It is actively being developed on the most recent versions of Chrome, Firefox, and Safari. For more information, consult [Can I Use](http://caniuse.com/#feat=css-clip-path)

###Requirements
polygonMaskJS requires jQuery to run.

##Setup
Simply add polygonMask.jquery.js to your document, and call `jQuery(el).polygonMask(direction)`. It's as simple as that!
Note that concurrent banners will need negative margins to line up together if they are to be seamless. polygonMaskJS will handle all of the z-indexing, so there's no need to worry about anything other than vertical positioning!


##Roadmap
While the current version of polygonMaskJS currently only supports two arbitrary directions (down and up), future iterations will allow for custom point strings, angle calculation, and more control over responsive behavior.
