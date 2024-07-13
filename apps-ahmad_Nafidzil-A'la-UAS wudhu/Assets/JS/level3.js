document.addEventListener('DOMContentLoaded', () => {
    // Get player name from localStorage
    const playerName = localStorage.getItem('playerName');
    document.getElementById('playerNameDisplay').textContent = playerName ? `Welcome, ${playerName}!` : "Welcome, Guest!";
    
    // Your existing drag-and-drop code goes here
    const words = document.querySelectorAll('.word');
    const dropzones = document.querySelectorAll('.dropzone');

    words.forEach(word => {
        word.addEventListener('dragstart', dragStart);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text', e.target.innerText);
        e.dataTransfer.effectAllowed = 'move';
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        const text = e.dataTransfer.getData('text');
        const dropzone = e.target;

        if (dropzone.classList.contains('dropzone') && dropzone.innerText === '') {
            dropzone.innerText = text;
            const draggedWord = Array.from(document.querySelectorAll('.word')).find(word => word.innerText === text);
            draggedWord.style.display = 'none';
        } else if (dropzone.classList.contains('dropzone') && dropzone.innerText !== '') {
            const previousText = dropzone.innerText;
            dropzone.innerText = text;
            const draggedWord = Array.from(document.querySelectorAll('.word')).find(word => word.innerText === text);
            draggedWord.style.display = 'none';

            const previousWord = Array.from(document.querySelectorAll('.word')).find(word => word.innerText === previousText);
            if (previousWord) {
                previousWord.style.display = 'block';
            }
        }
    }

    window.checkLevel1 = function() {
        const level1 = document.getElementById('level1');
        const dropzones = level1.querySelectorAll('.dropzone');
        let correct = true;

        dropzones.forEach(dropzone => {
            if (dropzone.innerText !== dropzone.dataset.answer) {
                correct = false;
            }
        });

        if (correct) {
            alert('Benar! Lanjut ke tingkat 2.');
            level1.style.display = 'none';
            document.getElementById('level2').style.display = 'block';
        } else {
            alert('Salah! Silakan ulangi.');
            resetLevel(level1);
        }
    }

    window.checkLevel2 = function() {
        const level2 = document.getElementById('level2');
        const dropzones = level2.querySelectorAll('.dropzone');
        let correct = true;

        dropzones.forEach(dropzone => {
            if (dropzone.innerText !== dropzone.dataset.answer) {
                correct = false;
            }
        });

        if (correct) {
            showPopup();
        } else {
            alert('Salah! Silakan ulangi.');
            resetLevel(level2);
        }
    }

    function resetLevel(level) {
        const dropzones = level.querySelectorAll('.dropzone');
        const words = level.querySelectorAll('.word');

        dropzones.forEach(dropzone => {
            dropzone.innerText = '';
        });

        words.forEach(word => {
            word.style.display = 'block';
        });
    }

    function showPopup() {
        const popup = document.getElementById('popup');
        const closeBtn = document.querySelector('.popup .close');
        const nextLevelButton = document.getElementById('nextLevelButton');

        popup.style.display = 'block';

        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == popup) {
                popup.style.display = 'none';
            }
        });

        nextLevelButton.addEventListener('click', function() {
            localStorage.setItem('unlockedLevels', '4');
            window.location.href = 'level4.html'; // Ganti dengan URL level berikutnya
        });
    }
});
       