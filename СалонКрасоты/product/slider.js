// массив изображений - файлов
const images =[
    '11.jpg','22.jpg','33.jpg','44.jpg','55.jpg','66.jpg', '77.jpg', '88.jpg', '99.jpg', '101.jpg'
];

// переменные
let activeImage = 0;
const sliderPlase = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;
sliderPlase.style.width = 3*widthOffset + 'px'; 
sliderPlase.style.height = widthOffset + 'px'; 
sliderPlase.style.left = '-'+ widthOffset + 'px'; 
let flag = true;

// стрелочная функция активного изображения
const initSlider =() =>{
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/'+images[activeImage];
    sliderPlase.append(img);
    nextImageGenerate();
    prevImageGenerate();
}

// стрелочная функция сдедующего изображения
const nextImageGenerate =() =>{
    let nextImage = activeImage + 1;  //номер следующего
    if (nextImage >= images.length) nextImage = 0;  //проверка номера 
    const img = document.createElement('img');  //создаем элемент
    img.alt = '';
    img.src = './images/'+images[nextImage];
    sliderPlase.append(img);  //добавить после
}

// стрелочная функция предыдущего изображения
const prevImageGenerate =(w = false) =>{
    let prevImage = activeImage - 1;  //номер предыдущего
    if (prevImage <0 ) prevImage = images.length - 1; //проверка номера
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/'+images[prevImage];
    if (w) img.style.width = 0;
    sliderPlase.prepend(img);  //добавить вперед
}

// стрелочная функция на кнопку next
const nextSlide = () =>{
    if (!flag) return;
        flag = !flag;

    activeImage++;
    if (activeImage >= images.length) activeImage = 0;
   // document.querySelector('.slider-line img').remove();
    nextImageGenerate();
    animate({
        duration : 1000,
        draw : function(progress){
            // console.log(progress);
            document.querySelector('.slider-line img').style.width = (widthOffset * (1 - progress)) + 'px';
        },
        removeElement : document.querySelector('.slider-line img')
    });
}

// стрелочная функция на кнопку prev
const prevSlide = () =>{
    if (!flag) return;
        flag = !flag;

    activeImage--;
    if (activeImage < 0) activeImage = images.length - 1;
    // document.querySelector('.slider-line img:last-child').remove();
    prevImageGenerate(true);
    animate({
        duration : 1000,
        draw : function(progress){
             document.querySelector('.slider-line img').style.width = (widthOffset *  progress) + 'px';
        },
        removeElement : document.querySelector('.slider-line img:last-child')
    });

}

//вызов функции
initSlider();

// назначение функции на кнопку next
document.querySelector('.next-button').addEventListener('click', nextSlide);

// назначение функции на кнопку prev
document.querySelector('.prev-button').addEventListener('click', prevSlide);

// стрелочная функция  для анимации
const animate = ({duration, draw, removeElement}) =>{
    const start = performance.now();

    requestAnimationFrame(function animate(time){
        let step =(time - start) / duration;
        if (step > 1) step = 1;
        draw(step);
        if (step < 1){
            requestAnimationFrame(animate);
        }
        else{
            removeElement.remove();
            flag = true; 
        }
    });
}
