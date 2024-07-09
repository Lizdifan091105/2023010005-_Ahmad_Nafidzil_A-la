document.addEventListener('DOMContentLoaded',function(){
    const playerName = localStorage.getItem('playerName')
    document.getElementById('playerNameDisplay').innerHTML= `Nama; ${playerName}`;

    const level1Button = document.getElementById('level1');
    const level2Button = document.getElementById('level2');
    const level3Button = document.getElementById('level3');
    const level4Button = document.getElementById('level4');
  
    level1Button.addEventListener('click',function(){
        window.location='level1.html';
    })

    level2Button.addEventListener('click',function(){
        window.location='level2.html';
    })

    level3Button.addEventListener('click',function(){
        window.location='level3.html';
    })

    level4Button.addEventListener('click',function(){
        window.location='level4.html';
    })

    const unlockedLevels= localStorage.getItem('unlockedLevels')||'1';
    if(unlockedLevels>=2)level2Button.disabled=false
    if(unlockedLevels>=3)level3Button.disabled=false
    if(unlockedLevels>=3)level4Button.disabled=false

    document.getElementById('resetButton').addEventListener(click,function(){
        localStorage.setItem('unlockedLevels','1')
        window.location.reload()
    })

})
