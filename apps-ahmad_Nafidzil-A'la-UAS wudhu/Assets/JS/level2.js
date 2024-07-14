document.addEventListener('DOMContentLoaded', () => {
    // Get player name from localStorage
    const playerName = localStorage.getItem('playerName');
    document.getElementById('playerNameDisplay').textContent = playerName ? `Nama : ${playerName}` : "Welcome, Guest!";
    let matchedPairs = 0;
    const totalPairs = 10;
    let countdown; 

    // Function to start dragging
    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    // Function to allow dragging over drop zones
    function dragOver(event) {
        event.preventDefault();
    }

    // Function to handle the drop
    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        const dropZone = event.target.closest('.drop-zone');

        if (dropZone && dropZone.dataset.match === id) {
            dropZone.innerHTML = '';
            dropZone.appendChild(draggableElement);
            draggableElement.classList.add('dropped');
            matchedPairs++;

            if (matchedPairs === totalPairs) {
                showPopup();
            }
        }
    }
    window.goToMenu = function() {
        window.location.href = 'menu.html'; // Ganti dengan URL menu yang sesuai
    };


    // Function to start the timer
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const timeDisplay = document.getElementById('time'); // Fixed ID here

        countdown = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timeDisplay.textContent = `Time Left: ${minutes}:${seconds}`;

            if (--timer < 0) {
                // clearInterval(countdown);
                alert("Time's up! Try again.");
                location.reload();
            }
        }, 1000);
    }

    // Initialize the game
    function initGame() {
        startTimer(80); 

        const images = document.querySelectorAll('.image-item');
        images.forEach(image => {
            image.addEventListener('dragstart', dragStart);
        });

        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', dragOver);
            zone.addEventListener('drop', drop);
        });
    }

    initGame();

     // Function to show the popup
    function showPopup() {
        clearInterval(countdown);
        const popup = document.getElementById('popup');
        popup.classList.add('show');
        document.getElementById('nextLevelButton').addEventListener('click', () => {
            localStorage.setItem('unlockedLevels', 3); 
            window.location.href = 'level3.html'; 
        });
    }

});
