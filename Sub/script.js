var devtools = {
    open: false,
    orientation: null
  };
  (function() {
    var threshold = 160;
    var devtoolsDetector = function() {
      var widthThreshold = window.outerWidth - window.innerWidth > threshold;
      var heightThreshold = window.outerHeight - window.innerHeight > threshold;
      var orientation = widthThreshold ? 'vertical' : 'horizontal';
      
      if (!(heightThreshold && widthThreshold) && 
          ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
        if (!devtools.open || devtools.orientation !== orientation) {
          devtools.open = true;
          devtools.orientation = orientation;
          window.dispatchEvent(new Event('devtoolschange'));
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          devtools.orientation = null;
          window.dispatchEvent(new Event('devtoolschange'));
        }
      }
    };
    setInterval(devtoolsDetector, 500);
  })();
  
  window.addEventListener('devtoolschange', function (e) {
    if (devtools.open) {
      alert('DevTools đang mở!');
      window.location.href = "about:blank";
    }
  });
  