const playerName = localStorage.getItem('playerName');
  if (playerName) {
    document.getElementById('playerNameDisplay').textContent = `Nama : ${playerName}`;
  }

let matchedPairs = 0;
const totalPairs = 8;
let countdown;

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
  const dropZone = event.target.closest('.dropzone');

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




// Fungsi untuk inisialisasi timer
function startTimer(duration) {
  let timer = duration, minutes, seconds;
  const timeDisplay = document.getElementById('timer');

   countdown = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = `Waktu: ${minutes}:${seconds}`;

    if (--timer < 0) {
      clearInterval(countdown);
      alert("Waktu kamu telah habis. Kamu Kalah");
      location.reload();
    }
  }, 1000);
}

// Fungsi untuk inisialisasi game
function initGame() {
  startTimer(80);

  const images = document.querySelectorAll('.draggable');
  images.forEach(image => {
    image.addEventListener('dragstart', dragStart);
  });

  const dropZones = document.querySelectorAll('.dropzone');
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
  });

}
window.goToMenu = function() {
  window.location.href = 'menu.html'; 
};
// Panggil fungsi inisialisasi game saat halaman dimuat
document.addEventListener('DOMContentLoaded', initGame);
console.log(localStorage)

// Fungsi untuk menampilkan popup
function showPopup() {
  clearInterval(countdown);
  const popup = document.getElementById('popup');
  popup.classList.add('show');
}

document.getElementById('nextLevelButton').addEventListener('click', () => {
  localStorage.setItem('unlockedLevels', '2'); 
  window.location.href = 'level2.html';
  showPopup(); 
});

  