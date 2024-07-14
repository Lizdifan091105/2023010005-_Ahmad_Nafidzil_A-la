document.addEventListener('DOMContentLoaded', () => {
    // Get player name from localStorage
    const playerName = localStorage.getItem('playerName');
    document.getElementById('playerNameDisplay').textContent = playerName ? `Nama : ${playerName}` : "Welcome, Guest!";

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
            const draggedWord = Array.from(words).find(word => word.innerText === text);
            draggedWord.style.display = 'none';
        } else if (dropzone.classList.contains('dropzone') && dropzone.innerText !== '') {
            const previousText = dropzone.innerText;
            dropzone.innerText = text;
            const draggedWord = Array.from(words).find(word => word.innerText === text);
            draggedWord.style.display = 'none';

            const previousWord = Array.from(words).find(word => word.innerText === previousText);
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
            document.getElementById('completionModal').style.display = 'none';

        } else {
            alert('Salah! Silakan ulangi.');
            resetLevel(level1);
        }
    };

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

    window.goToMenu = function() {
        window.location.href = 'menu.html'; // Ganti dengan URL menu yang sesuai
    };
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
            document.getElementById('completionModal').style.display = 'block';
            level2.style.display = 'none';
        } else {
            alert('Salah! Silakan ulangi.');
            resetLevel(level2);
        }
    };

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

    window.goToMenu = function() {
        window.location.href = 'menu.html'; // Ganti dengan URL menu yang sesuai
    };
    window.closeModal = function() {
        document.getElementById('completionModal').style.display = 'none';
    };
});
