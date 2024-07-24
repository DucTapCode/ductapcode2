// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// DOM Elements
const btn = document.getElementById("button1");
const xem = document.getElementById("xem");
const urlfile = document.getElementById("url");
const chonloai = document.getElementById("chonloai");
const fileInput = document.getElementById("file");
const videoInput = document.getElementById("video");
const otherInput = document.getElementById("other");

chonloai.addEventListener("change", function() {
    const option = chonloai.value;
    fileInput.style.display = "none";
    videoInput.style.display = "none";
    otherInput.style.display = "none";

    if (option == 1) {
        fileInput.style.display = "block";
        fileInput.accept = ".png, .jpg, .jpeg"; // Chỉ cho phép ảnh
    } else if (option == 2) {
        videoInput.style.display = "block";
        videoInput.accept = ".mp4, .avi, .mkv"; // Chỉ cho phép video
    } else {
        otherInput.style.display = "block";
        otherInput.accept = "*"; // Không giới hạn loại tệp
    }
});

async function pickRandomFile() {
    try {
        const option = chonloai.value;
        let listRef = storage.ref();
        if (option == 1) {
            listRef = storage.ref().child("images/");
        } else if (option == 2) {
            listRef = storage.ref().child("videos/");
        } else {
            listRef = storage.ref().child("others/");
        }

        const result = await listRef.listAll();
        const items = result.items;

        if (items.length === 0) {
            return;
        }

        // Pick a random file
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomFileRef = items[randomIndex];

        // Get the download URL
        const url = await randomFileRef.getDownloadURL();
        xem.style.display = "block";
        urlfile.href = url;
        urlfile.innerHTML = randomFileRef.name;
    } catch (error) {
        console.error("Error picking random file:", error);
    }
}

document.getElementById("random").addEventListener("click", pickRandomFile);

btn.addEventListener("click", async (e) => {
    const filename = prompt("Tên file");
    const option = chonloai.value;
    let file;
    if (option == 1) {
        file = fileInput.files[0];
    } else if (option == 2) {
        file = videoInput.files[0];
    } else {
        file = otherInput.files[0];
    }

    if (!file) {
        alert("Vui lòng chọn một tệp trước khi tải lên.");
        return;
    }

    let storageRef = storage.ref();
    if (option == 1) {
        storageRef = storage.ref().child(`images/${filename}`);
    } else if (option == 2) {
        storageRef = storage.ref().child(`videos/${filename}`);
    } else {
        storageRef = storage.ref().child(`others/${filename}`);
    }

    const task = storageRef.put(file);

    task.on(
        "state_changed",
        function progress(snapshot) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(
                `%c${filename}:%c${progress}%`,
                'color: white; font-size: 16px;',
                'color: blue; font-size: 16px;'
              );
        },
        function error(err) {
            console.log("Đã xảy ra lỗi: " + err);
        },
        async function completed() {
            try {
                const url = await storageRef.getDownloadURL();
                xem.style.display = "block";
                urlfile.href = url;
                urlfile.innerHTML = filename;
            } catch (error) {
                console.error("Error getting download URL:", error);
            }
        }
    );
});
