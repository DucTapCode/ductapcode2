document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Bạn không được sử dụng chuột phải trong trang web này");
  }, false);

  document.addEventListener('keydown', function(e) {
    // Chặn F12
    if (e.keyCode == 123) {
      e.preventDefault();
      alert("Bạn không được sử dụng DevTools trong trang web này");
    }
    // Chặn Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) {
      e.preventDefault();
      alert("Bạn không được sử dụng DevTools trong trang web này");
    }
    // Chặn Ctrl+U
    if (e.ctrlKey && e.keyCode == 85) {
      e.preventDefault();
      location.reload();
    }
  }, false);