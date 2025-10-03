// settings-box
// get settings elements
let settingsContainer = document.querySelector('.settings');
let settingsIconContainer = document.querySelector('.settings .icon');
let settingsIcon = document.querySelector('.settings i');
let colors = document.querySelectorAll('.colors li');
let backgoundBtns = document.querySelectorAll('.background button');
let backRanoController = true;
let backgoundInterval;

// check if color in localStorage or not when the page is loaded & active class
let localColor = localStorage.getItem('color');

if(localColor !== null){
    // set root color on localStorage 
    document.documentElement.style.setProperty('--main-color', localColor);
    
    // loop on colors but by localColor check before
    colors.forEach(element => {
        // remove active from all elements
        element.classList.remove('active');

        // set active to targe element
        if(element.dataset.color === localColor){
            element.classList.add('active');
        }
    })
}

// loop on all colors
colors.forEach((li) => {
    // handle click on every color
    li.addEventListener('click', (e) => {
        // first set color in page
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // after that set it in localStorage
        localStorage.setItem('color', e.target.dataset.color);

        handlActiveState(e)
    });
})

// check if localStorage not empty from background Option
let localBack = localStorage.getItem('background-option')

if(localBack !== null){

    if(localBack === 'true'){
        backRanoController = true;
    }else{
        backRanoController = false;
    }

    backgoundBtns.forEach(element => {
        element.classList.remove('active');
    });

    if(localBack === 'true'){
        document.querySelector('.btns .yes').classList.add('active')
    }
    else{
        document.querySelector('.btns .no').classList.add('active')
    }
}

// loop on all colors
backgoundBtns.forEach((btn) => {
    // handle click on every btn
    btn.addEventListener('click', (e) => {

        handlActiveState(e)

        if(e.target.dataset.background === 'yes'){
            backRanoController= true;
            randomize();
            localStorage.setItem('background-option', true)
        }
        else{
            backRanoController= false;
            clearInterval(backgoundInterval);
            localStorage.setItem('background-option', false)
        }
    });
})

settingsIconContainer.addEventListener('click', () => {
    //add spin to icon
    settingsIcon.classList.toggle('fa-spin');

    // make left of settingsContainer 200
    settingsContainer.classList.toggle('opened');

    document.querySelector('.logo').classList.toggle('zero-opacity');

    document.querySelector('.links-container').classList.toggle('navToggle');

});


// bullets
let bulletsContainer = document.querySelector('.bullets');
let bulletsBox = document.querySelectorAll('.show-bullets button');
let bulletsLocal = localStorage.getItem('bltDisplay');

if(bulletsLocal !== null){

    bulletsBox.forEach(blt => {
        blt.classList.remove('active');
    })

    if(bulletsLocal === 'block'){
        bulletsContainer.style.display = 'block';  
        document.querySelector('.show-bullets .yes').classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';  
        document.querySelector('.show-bullets .no').classList.add('active');
    }

}

bulletsBox.forEach(btn => 
    btn.addEventListener('click', (e) => {

        if(btn.dataset.display === 'show'){

            bulletsContainer.style.display = 'block';
            localStorage.setItem('bltDisplay', 'block');

        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bltDisplay', 'none');
        }

        handlActiveState(e);

    })
)

// reset options
let resetOptions = document.querySelector('.resetBtnt')

resetOptions.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload()
})


// landingPage
let landingPage = document.querySelector('.landing');

// array of images
let imgArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', ];

// function to control the randomize of backgound
function randomize(){
    if(backRanoController === true){
        
        backgoundInterval = setInterval(() => {
            // get random number
            let num = Math.floor(Math.random() * imgArray.length)

            // set style for landing 
            landingPage.style.backgroundImage = `url(./imgs/${imgArray[num]})`;
        },2500)
    }
}
randomize();

// toggle menue
let toggleMenu = document.querySelector('.fa-bars-staggered');
let menuLinks = document.querySelector('.header-area .links');
// let landingContainer = document.querySelector('.landing .container');

toggleMenu.onclick = function(){
    this.classList.toggle('menu-active');
    menuLinks.classList.toggle('open');
    // landingContainer.classList.toggle('index');
}

document.addEventListener('click', (e) => {

    if(e.target !== toggleMenu && e.target !== menuLinks ){

        if(menuLinks.classList.contains('open')){
            toggleMenu.classList.toggle('menu-active');
            menuLinks.classList.toggle('open');
        }

    }

})


// skills-page
let skills = document.querySelector('.skills')

window.onscroll = function(){

    let skillsOuterHeight = skills.offsetHeight;
    // console.log(skillHeight);
    
    let skillOffsetTop = skills.offsetTop;
    // console.log(skillOuterHeight);
    
    let onePageViewedHeight = this.innerHeight;
    // console.log(onePageViewedHeight);
    
    let scrollPixels = this.pageYOffset;
    // console.log(scrollPixels);
    

    if(scrollPixels > (skillOffsetTop + skillsOuterHeight - onePageViewedHeight)){
        let skillSpans = document.querySelectorAll('.skills .skill-progress span');

        skillSpans.forEach(skill => {
            console.log('achived');
            skill.style.width = skill.dataset.progress;
        })

        
    }

}


// gallery
let gallery = document.querySelectorAll('.gallery .imgs-box img')

gallery.forEach(img => {

    img.addEventListener('click', (e) => {
        // create overlay
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        // create popup box and its content
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        
        // create head that contain alt of image
        let head = document.createElement('h3');
        head.className = 'popup-head';
        let headContent = document.createTextNode(img.alt);
        head.appendChild(headContent);
        popupBox.appendChild(head);
        
        // creat loremParagraph and its content 
        let loremParagraph = document.createElement('p');
        loremParagraph.className = 'popup-description'
        let loremText = document.createTextNode('Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci, quaerat magni laborum consectetur.');
        popupBox.appendChild(loremParagraph);
        loremParagraph.appendChild(loremText);

        // create img   
        let image = document.createElement('img');
        image.src = img.src;

        // append image to popupBox
        popupBox.appendChild(image);

        // append popupBox to overlay
        overlay.appendChild(popupBox);

        // create close btn 
        let closeBtn = document.createElement('p');
        closeBtn.className = 'close-btn';
        let btnContent = document.createTextNode('X');
        popupBox.appendChild(closeBtn)
        closeBtn.appendChild(btnContent)
    })

})

// close overlay and popupbox
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('close-btn')){
        document.querySelector('.popup-box').remove()
        document.querySelector('.popup-overlay').remove();
    }
    
})


// testimolians
let theImg = document.querySelector('.ts-box img');
let imgArry = ['avatar-01', 'avatar-02', 'avatar-03', 'avatar-04', 'avatar-05'];
let leftBtn = document.querySelector('.fa-chevron-left');
let rightBtn = document.querySelector('.fa-chevron-right');
let count = 0;

rightBtn.addEventListener('click', function(){
    count = count+1;
    
    if(count < 5 && count > 0){
        theImg.src = `./imgs/testimolians/${imgArry[count]}.png`;
        rightBtn.classList.add('icon-active');
        rightBtn.classList.remove('unactive');
        leftBtn.classList.add('icon-active');
        leftBtn.classList.remove('unactive');
    }

    else if(count === 5){
        theImg.src = `./imgs/testimolians/${imgArry[4]}.png`;
        rightBtn.classList.add('unactive');
        rightBtn.classList.remove('icon-active');
        count = 4
    }
})

leftBtn.addEventListener('click', function(){
    count = count-1;

    if(count > 0 && count < 5){
        theImg.src = `./imgs/testimolians/${imgArry[count]}.png`;
        leftBtn.classList.add('icon-active');
        leftBtn.classList.remove('unactive');
        rightBtn.classList.add('icon-active');
        rightBtn.classList.remove('unactive');
    }
    else if(count < 1 && count === 0){
        leftBtn.classList.add('unactive');
        leftBtn.classList.remove('icon-active');
        count = 0;
        theImg.src = `./imgs/testimolians/${imgArry[0]}.png`;
    }
})

// start bullets
let bullets = document.querySelectorAll('.bullets .bullet');
let links = document.querySelectorAll('.links li')

function scrollToSomehere(element) {
    element.forEach(ele => {
        ele.addEventListener('click', (e)=> {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollToSomehere(bullets);
scrollToSomehere(links);


// handle active state
function handlActiveState(ev){

    // first remove active class from all children of ul by it's parentElement and loop by forEach
    ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
    })

    // after that add active class to the clicked Element 
    ev.target.classList.add('active');

}