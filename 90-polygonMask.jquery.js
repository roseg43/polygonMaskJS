/**
 * This allows dynamic-height svg polygon clip masks. Currently only supports 
 * slanted separators, but can easily be expanded to include custom polygon point strings.
 * Author: Gabe Rose
 * 
 * Usage: Call .polygonMask() on any jQuery object to create a slanted module that supports full-width
 *          backgrounds. Currently has 0 support for IE as it relies on SVG clipPath.
 * @param direction : String that determines the direction of the slant.
 **/
(function($) {

var index = 0;
var window_width = $(window).outerWidth();

$.fn.polygonMask = function(direction, _recalc_window_width, options) {
        
    if (_recalc_window_width) {
        window_width = _recalc_window_width;
    }
  
  if ($(this).length > 1) {  
      $(this).each(function() {
       createMask($(this), direction);
      });
  }else if ($(this).length == 1) {
      createMask($(this), direction);
  }else {
    return;
  }
};

function createMask(el, direction) {
    var $this = el,
      height = $this.outerHeight(),
      offset_top = $this.offset().top;
      
     
    
      /**
      	* Firefox automatically attaches SVG clip paths to the top of the parent element while Chrome attaches it to the window.
        * To fix this, we're going to check if the user is using Firefox, and set the top offset to zero if they are.
        * 
       **/
      var isFirefox = typeof InstallTrigger !== 'undefined';
        
        // Newer versions of chrome work the same way as firefox. < Chrome 53 positions SVGs at the window top vs the element top.
        var chromeVersion = (function() {      
            var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return raw ? parseInt(raw[2], 10) : false;
        })();
    if (isFirefox || chromeVersion > 52)
      offset_top = 0;
      
      
      // Currently culling support for Safari, as there are quite a few bugs that need to be worked out
      var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      if (isSafari) return;
     
     var directions = {
     up: 60,
     down: 60
     };
     
     var offset = directions[direction];
     var points_string = calcPoints(direction, offset, offset_top, height);
     
      var $currentSVG = $this.find('svg');
      if ($currentSVG.length > 0) {
          updatePoints($currentSVG, points_string);
          return;
      }
      
    var width = 0,
        height = 0;
      
    //SVG generation
    var _svgNS = 'http://www.w3.org/2000/svg';
    var svg = "<svg width='" + width + "' height='" + height + "' shape-rendering='geometricPrecision' viewBox='0 0 " + $this.innerWidth() + " " + $this.innerHeight() + "' xmlns='http://www.w3.org/2000/svg' version='1.1'><defs></defs></svg>";
    
    $this.append(svg);
    var parent = $this.find('svg defs').get()[0];

    var clippath = document.createElementNS(_svgNS, 'clipPath');
    clippath.setAttributeNS(null, 'id', 'clip-' + index);

    
   // Uncomment for debugging points
    //console.log('ITEM ' + index + ': ' + points_string);

    var polygon = document.createElementNS(_svgNS, 'polygon');
    polygon.setAttribute("points", points_string);
    clippath.innerHTML = polygon.outerHTML;
    parent.innerHTML = clippath.outerHTML;

		$this.css('-moz-clip-path', 'url(#clip-' + index + ')');
    $this.css('-webkit-clip-path', 'url(#clip-' + index + ')');
    $this.css('clip-path', 'url(#clip-' + index + ')');
    index++;
}

function updatePoints(svg, points) {
    var polygon = svg.find('polygon').get()[0];
    polygon.setAttribute("points", points);
}

function calcPoints(direction, offset, offset_top, height) {
     height += offset_top;
    offset += offset_top;
    var points= [];
    if (direction == "up") {
    	points[0] = "0 " + (offset);
    }else{
      points[0] = "0 " + offset_top; 
    }
    
    points[1] = "0 " + (height);
    points[2] = window_width + " " + height;
    if (direction == 'up') {
      points[3] = window_width + " " + offset_top;
    }else {
      points[3] = window_width + " " +  offset;
    }
    
    return points.join(',');
}

$(function() {
   $('.clip').each(function(index, el) {
      $(this).css('z-index', (index + 30)); 
   });
});
    
})(jQuery);
