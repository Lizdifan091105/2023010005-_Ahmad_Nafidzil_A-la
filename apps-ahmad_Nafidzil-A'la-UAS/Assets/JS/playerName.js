document.getElementById('nameForm').addEventListener('submit', function(e){
    e.preventDefault();
    const playerName = document.getElementById('playerName').velue;
    localStorage.setItem('playerName',playerName)
    windows.location.href='menu.html'
})
