var firebaseConfig = {
  apiKey: "AIzaSyBNNbmN7GnsMbg3tFz64WNz4J-oYAR0ocY",
  authDomain: "dtapcode.firebaseapp.com",
  databaseURL: "https://dtapcode-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dtapcode",
  storageBucket: "dtapcode.appspot.com",
  messagingSenderId: "877812379291",
  appId: "1:877812379291:web:db966e502ef657a942a03e",
  measurementId: "G-04TJ3EWMMS",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage(app);

// Chọn nút
const btn = document.getElementById("button1");
const xem = document.getElementById("xem");
const urlfile = document.getElementById("url");

// Thêm lắng nghe sự kiện click cho nút đã chọn
async function pickRandomFile() {
  const listRef = storage.ref().child("images/");
  try {
      const result = await listRef.listAll();
      const items = result.items;

      if (items.length === 0) {
          alert('Không có tệp nào trong thư mục này.');
          return;
      }

      // Pick a random file
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomFileRef = items[randomIndex];

      // Get the download URL
      const url = await randomFileRef.getDownloadURL();
      xem.style.display = "block";
      urlfile.href = url;
      urlfile.innerText = randomFileRef.name;
  } catch (error) {
      console.error('Error picking random file:', error);
  }
}

document.getElementById("random").addEventListener("click", pickRandomFile);

btn.addEventListener("click", async (e) => {
  const filename = prompt("Tên file");
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
      alert("Vui lòng chọn một tệp trước khi tải lên.");
      return;
  }

  const storageRef = storage.ref();
  const final = storageRef.child(`images/${filename}`);
  const task = final.put(file);

  task.on(
      "state_changed",
      function progress(progress) {
          console.log((progress.bytesTransferred / progress.totalBytes) * 100);
      },
      function error(err) {
          console.log("Đã xảy ra lỗi: " + err);
      },
      async function completed() {
          try {
              const url = await final.getDownloadURL();
              xem.style.display = "block";
              urlfile.href = url;
              urlfile.innerText = filename;
          } catch (error) {
              console.error('Error getting download URL:', error);
          }
      }
  );
});