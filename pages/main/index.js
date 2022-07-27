import cardsAnimal from "../../assets/modules/animal-cards.js";
import burger from "../../assets/scripts/burger.js";
import {btnBurger, headerNav, headerLogo, blockDark} from '../../assets/scripts/burger.js';

const imagesPets = [];
const cardPics = document.querySelectorAll('.card-pic');
const cardTitle = document.querySelectorAll('.card-title');
const arrows = document.querySelectorAll('.arrow')
const numberRandomCollection = [];
let previousRandom = [0];


// burger
function changeBurger() {
  burger.changeBurger();
}

btnBurger.addEventListener('click', changeBurger)

headerNav.addEventListener('click', (event) => {
  if(event.target.className == 'header_nav__item_link') {
    burger.changeBurger();
  }
  if(event.target.className == 'header_logo_nav__title' || event.target.className == 'header_logo_nav__desc') {
    event.preventDefault()
    burger.changeBurger();
  }
})

document.addEventListener('click', (event) => {
  if(event.target.className == 'dark-block dark-block_active') {
    burger.changeBurger();
  }
})

// carusel
function DownloadImagesPets(obj) {
  obj.forEach(item => {
    let img = new Image();
    img.src = item.img;
    imagesPets.push(img.src);
  })
}
DownloadImagesPets(cardsAnimal) 

function getRandomInt(min, max) {

  for(let i = 0; i < 3; i++) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.floor(Math.random() * (max - min)) + min;
    while(previousRandom.includes(num) == true) {
      num = Math.floor(Math.random() * (max - min)) + min;
    }
    numberRandomCollection.push(num);
  }
  for(let i = 0; i < 2; i++) {
    for(let j = i + 1; j < 3; j++) {
      if(numberRandomCollection[i] == numberRandomCollection[j]) {
        numberRandomCollection.length = [];
        getRandomInt(0, 8);
      }
    }
  }
}

function DownloadCardPics() {
  let i = 0;
  numberRandomCollection.length = []
  getRandomInt(0, 8)
  previousRandom.length = [];
  previousRandom = previousRandom.concat(numberRandomCollection);
  for(let value of cardPics) {
    value.style.backgroundImage = `url('${imagesPets[numberRandomCollection[i]]}')`;
    cardTitle[i].textContent = cardsAnimal[numberRandomCollection[i]].name;
    i += 1;
  }
}
DownloadCardPics()

arrows[0].addEventListener('click', DownloadCardPics);
arrows[1].addEventListener('click', DownloadCardPics);


// modal window

const cardsContainer = document.querySelector('.cards_items_container');
const modalWindow = document.querySelector('.modal-window');
const potapClose = document.querySelector('.potap_close');

const modalPicImg = document.querySelector('.modal-pic_img');
const modalWindowtTitle = document.querySelector('.modal-window_title');
const modalWindowDesc = document.querySelector('.modal-window_desc');
const modalWindowText = document.querySelector('.modal-window_text');
const age = document.querySelector('.age');
const noculations = document.querySelector('.noculations');
const diseases = document.querySelector('.diseases');
const parasites = document.querySelector('.parasites');
const darkBlock = document.querySelector('.dark-block');

function changeModal() {
  blockDark.classList.toggle("dark-modal_active");
  modalWindow.classList.toggle("modal-window__changed");
  document.body.classList.toggle("stop-scrolling_modal");
}

function downloadInformationCard(name) {
  cardsAnimal.forEach((item, index) => {
    if(name == item.name) {
      modalPicImg.setAttribute('src', item.img)
      modalWindowtTitle.textContent = item.name;
      modalWindowDesc.textContent = item.type + ' ' + item.breed;
      modalWindowText.textContent = item.description;
      age.textContent = item.age;
      noculations.textContent = item.inoculations.map(item => {
        return (item + ' ')
      })
      diseases.textContent = item.diseases.map(item => {
        return (item + ' ')
      });
      parasites.textContent = item.parasites.map(item => {
        return (item + ' ')
      });
    }
  })
}

cardsContainer.addEventListener('click', (event) => {
  if(event.target.className == 'card-pic' || event.target.className == 'card-title' || event.target.className == 'btn_2' || event.target.className == 'card') {
    if(event.target.className == 'card-pic' || event.target.className == 'card-title' || event.target.className == 'btn_2') {
      let name = event.target.parentNode.childNodes[3].textContent;
      downloadInformationCard(name) 
      changeModal()
    }
    if(event.target.className == 'card') {
      let name = event.target.childNodes[3].textContent;
      downloadInformationCard(name) 
      changeModal()
    }
  }
})

potapClose.addEventListener('click', (event) => {
  changeModal()
})

document.addEventListener('click', (event) => {
  if(event.target.className == 'dark-block dark-modal_active') {
    changeModal();
  }
})

darkBlock.addEventListener('mouseover', (event) => {
  if(event.target.className == 'dark-block dark-modal_active') {
    potapClose.classList.add('potap_close_active')
  }
})
darkBlock.addEventListener('mouseout', (event) => {
  potapClose.classList.remove('potap_close_active')
})
