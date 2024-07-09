const images = [
    'Assets/Img/image1.jpg',
    'Assets/Img/image2.jpg',
    'Assets/Img/image3.jpg',
    'Assets/Img/image4.jpg',
    'Assets/Img/image5.jpg',
    'Assets/Img/image6.jpg',
    'Assets/Img/image7.jpg',
    'Assets/Img/image8.jpg',
    'Assets/Img/image9.jpg',
    'Assets/Img/image10.jpg',
  ];
  
  let matchedPairs = 0;
  const totalPairs = images.length;
  
  // Fungsi untuk mengacak array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Fungsi untuk membuat gambar di image container
  function createImages() {
    const imageContainer = document.getElementById('image-container');
    const gameBoard = document.getElementById('game-board');
  
    // Gambar tetap diurutkan di image container
    images.forEach((img, index) => {
      // Buat elemen gambar
      const imageElement = document.createElement('img');
      imageElement.src = img;
      imageElement.alt = `Image ${index + 1}`;
      imageElement.classList.add('image-item');
      imageElement.draggable = true;
      imageElement.id = `img-${index}`;
      imageElement.addEventListener('dragstart', dragStart);
  
      imageContainer.appendChild(imageElement);
    });
  
    // Acak urutan drop zones
    const shuffledDropZones = shuffle([...images]);
  
    shuffledDropZones.forEach((img, index) => {
      // Buat drop zone
      const dropZone = document.createElement('div');
      dropZone.classList.add('drop-zone');
      dropZone.dataset.match = `img-${index}`;
  
      dropZone.addEventListener('dragover', dragOver);
      dropZone.addEventListener('drop', drop);
  
      gameBoard.appendChild(dropZone);
    });
  }
  
  // Fungsi drag start
  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  // Fungsi drag over
  function dragOver(event) {
    event.preventDefault();
  }
  
  // Fungsi drop
  function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropZone = event.target.closest('.drop-zone');
  
    // Cek apakah elemen drop adalah drop zone yang benar
    if (dropZone && dropZone.dataset.match === id) {
      dropZone.innerHTML = '';
      dropZone.appendChild(draggableElement);
      draggableElement.classList.add('dropped');
      matchedPairs++;
  
      // Cek apakah semua pasangan sudah ditemukan
      if (matchedPairs === totalPairs) {
        showPopup();
      }
    }
  }
  
  // Fungsi untuk menampilkan popup
  function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
  
    document.getElementById('nextLevelButton').addEventListener('click', function() {
      localStorage.setItem('unlockedLevels', '3');
      window.location.href = 'level3.html'; // Ganti dengan URL level berikutnya
    });
  }
  
  // Fungsi untuk inisialisasi timer
  function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timeDisplay = document.getElementById('time');
  
    const countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      timeDisplay.textContent = seconds;
  
      if (--timer < 0) {
        clearInterval(countdown);
        alert("Waktu habis! Coba lagi.");
        location.reload();
      }
    }, 1000);
  }
  
  // Fungsi untuk inisialisasi game
  function initGame() {
    createImages();
    startTimer(60); // Set timer untuk 60 detik
  }
  
  // Panggil fungsi inisialisasi game saat halaman dimuat
  document.addEventListener('DOMContentLoaded', initGame);
  