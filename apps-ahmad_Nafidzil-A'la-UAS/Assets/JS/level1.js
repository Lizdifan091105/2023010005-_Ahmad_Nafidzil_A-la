document.addEventListener('DOMContentLoaded',function(){
    const playerName=localStorage.getItem('playerName');
    document.getElementById('playerNameDisplay').innerHTML=`Nama: ${playerName}`;

    const images=[
        'Assets/Img/image1.jpg',
        'Assets/Img/image2.jpg',
        'Assets/Img/image3.jpg',
        'Assets/Img/image4.jpg',
        'Assets/Img/image5.jpg',
        'Assets/Img/image6.jpg',
        'Assets/Img/image7.jpg',
        'Assets/Img/image8.jpg'
    ];

    let shuffledImages=images.slice().sort(()=>Math.random()-0.5);

    const gameArea=document.getElementById('gameArea');
    shuffledImages.forEach(img=> {
        let imgElement=document.createElement('img');
        imgElement.src=img;
        imgElement.draggable=true;
        imgElement.classList.add('draggable');
        imgElement.addEventListener('dragstart',dragStart);
        imgElement.addEventListener('dragover',dragOver);
        imgElement.addEventListener('drop',drop);
        gameArea.appendChild(imgElement)
        });

        document.getElementById('menuButton').addEventListener('click',function(){
            window.location.href="menu.html"
        });
        document.getElementById('checkButton').addEventListener('click',function(){
            checkOrder();
        });
        
        function dragStart(event){
            event.dataTransfer.setData('text/plain',event.target.src);
            setTimeout(()=>{
                event.target.classList.add('hide')
            },0);
        };

        function dragOver(event){
            event.preventDefault();
            event.target.classList.add('drag-over');
        };

        function drop(event){
            event.preventDefault();
            const draggedImageSrc=event.dataTransfer.getData('text/plain')
            const targetImage= event.target;

            if(targetImage.tagName==='IMG'){
            const targetImageSrc= targetImage.src;
            targetImage.src= draggedImageSrc;
            const draggedImage= document.querySelector(`img[src="${draggedImageSrc}"]`);
            draggedImage.src= targetImageSrc;
            }

            event.target.classList.remove('drag-over')
            document.querySelectorAll('.draggable').forEach((img) => img.classList.remove('hide'));
        }
        function checkOrder(){
            const currentImages =Array.from(gameArea.getElementsByTagName('img')).map(img=>img.src.split('/').pop());
            const correctOrder = images.map(img=>img.split('/').pop());

            if (JSON.stringify(currentImages)===JSON.stringify(correctOrder)){
                showPopup();
            }

            else{
                alert('urutan gambar belum bena, coba lagi!');
            }
        }

        function showPopup(){
            const popup =document.getElementById('popup');
            const closeBtn=document.querySelector('.popup.close');
            const nextLevelButton=document.getElementById('nextLevelButton');

            popup.style.display='block';

            closeBtn.addEventListener('click',function(){
                popup.style.display='none';
            })

            window.addEventListener('click',function(event){
                if(event.target== popup){
                    popup.style.display='none'
                }
            })

            nextLevelButton.addEventListener('click',function(){
                window.location.href='level2.html'
            })
        }


})