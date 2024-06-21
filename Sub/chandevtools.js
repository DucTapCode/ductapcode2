document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);

  document.addEventListener('keydown', function(e) {
    // Chặn F12
    if (e.keyCode == 123) {
      e.preventDefault();
    }
    // Chặn Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) {
      e.preventDefault();
    }
    // Chặn Ctrl+U
    if (e.ctrlKey && e.keyCode == 85) {
      e.preventDefault();
    }
  }, false);