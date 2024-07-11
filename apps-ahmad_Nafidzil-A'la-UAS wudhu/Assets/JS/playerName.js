document.getElementById('nameForm').addEventListener('submit', function(e){
    e.preventDefault();
    const playerName = document.getElementById('playerName').value;
    localStorage.setItem('playerName',playerName)
    window.location.href='menu.html'
})
