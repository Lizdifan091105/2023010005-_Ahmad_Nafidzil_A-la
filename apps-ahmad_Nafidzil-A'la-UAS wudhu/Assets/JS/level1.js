document.addEventListener('DOMContentLoaded', function() {
    const dropzones = document.querySelectorAll('.dropzone');
    const draggables = document.querySelectorAll('.draggable');
    const timerDisplay = document.getElementById('timer');
    const playerName = localStorage.getItem('playerName');
    document.getElementById('playerNameDisplay').innerHTML = `Nama: ${playerName}`;
    let timeLeft = 80;

    let countdown = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(countdown);
            alert('Game Over! Time is up.');
        }
    }, 1000);

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggableId = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(draggableId);
            
            // Check if the dragged image matches the question image
            const questionId = dropzone.id.replace('dropzone', '');
            const questionImage = document.querySelector(`.question-container:nth-child(${questionId}) .question-img`).src;

            if (draggedElement.src === questionImage) {
                dropzone.innerHTML = ''; // Clear the dropzone
                dropzone.appendChild(draggedElement);
                draggedElement.style.width = '100%'; // Adjust image size to fit dropzone
                draggedElement.style.height = '100%';
                dropzone.style.backgroundColor = '#8bc34a'; // Green background for correct answer
                dropzone.dataset.correct = 'true';
            } else {
                dropzone.style.backgroundColor = '#f44336'; // Red background for incorrect answer
                dropzone.dataset.correct = 'false';
            }

            checkWinCondition();
        });
    });

    function checkWinCondition() {
        let allCorrect = true;
        dropzones.forEach(dropzone => {
            if (dropzone.dataset.correct !== 'true') {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            clearInterval(countdown);
            alert('Congratulations! You have matched all the images correctly.');
        }
    }
});
