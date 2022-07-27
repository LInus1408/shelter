import cardsAnimal from "../../assets/modules/animal-cards.js";
import burger from "../../assets/scripts/burger.js";
import {btnBurger, headerNav, headerLogo, blockDark} from '../../assets/scripts/burger.js';


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

// Pagination

let numberRandomCollection = [];
let randomNumbers = [];
const cardPics = document.querySelectorAll('.card-pic');
const cardsTitles = document.querySelectorAll('.card-title');
const scrollCircles = document.querySelectorAll('.scroll_circle');


function getRandomInt(min, max, iter) {
  var res = new Set();
  while (res.size < iter) res.add(Math.floor(Math.random() * (max - min + 1)) + min);
  res.forEach((value, valueAgain, set) => {
    randomNumbers.push(value)
  });

}

function ready() {

  if(document.documentElement.clientWidth > 1279) {
    for(let i = 0; i < 6; i++) {
      getRandomInt(0, 7, 8)
      numberRandomCollection[i] = randomNumbers.map(item => {
        return item;
      })
      randomNumbers.length = [];
    }

  } else if(document.documentElement.clientWidth > 767) {
    for(let i = 0; i < 8; i++) {
      getRandomInt(0, 7, 6)
      numberRandomCollection[i] = randomNumbers.map(item => {
        return item;
      })
      randomNumbers.length = [];
    }
  } else {
    for(let i = 0; i < 16; i++) {
      getRandomInt(0, 7, 3)
      numberRandomCollection[i] = randomNumbers.map(item => {
        return item;
      })
      randomNumbers.length = [];
    }
  }
  numberRandomCollection[0].forEach((item, index) => {
    cardPics[index].style.backgroundImage = `url(${cardsAnimal[item].img})`;
    cardsTitles[index].textContent = cardsAnimal[item].name;
  })
}

document.addEventListener("DOMContentLoaded", ready);

scrollCircles[3].addEventListener('click', (event) => {
  scrollCircles[0].classList.remove('scroll_disable');
  scrollCircles[1].classList.remove('scroll_disable');
  scrollCircles[2].textContent = +scrollCircles[2].textContent + 1;
  numberRandomCollection[+scrollCircles[2].textContent - 1].forEach((item, index) => {
    cardPics[index].style.backgroundImage = `url(${cardsAnimal[item].img})`;
    cardsTitles[index].textContent = cardsAnimal[item].name;
  })
  if(+scrollCircles[2].textContent == numberRandomCollection.length) {
    scrollCircles[3].classList.add('scroll_disable');
    scrollCircles[4].classList.add('scroll_disable');
  }
})

scrollCircles[4].addEventListener('click', (event) => {
  scrollCircles[0].classList.remove('scroll_disable');
  scrollCircles[1].classList.remove('scroll_disable');
  scrollCircles[2].textContent = numberRandomCollection.length;
  numberRandomCollection[+scrollCircles[2].textContent - 1].forEach((item, index) => {
    cardPics[index].style.backgroundImage = `url(${cardsAnimal[item].img})`;
    cardsTitles[index].textContent = cardsAnimal[item].name;
  })
  scrollCircles[3].classList.add('scroll_disable');
  scrollCircles[4].classList.add('scroll_disable');
})

scrollCircles[1].addEventListener('click', (event) => {
  scrollCircles[3].classList.remove('scroll_disable');
  scrollCircles[4].classList.remove('scroll_disable');
  scrollCircles[2].textContent = +scrollCircles[2].textContent - 1;
  numberRandomCollection[+scrollCircles[2].textContent - 1].forEach((item, index) => {
    cardPics[index].style.backgroundImage = `url(${cardsAnimal[item].img})`;
    cardsTitles[index].textContent = cardsAnimal[item].name;
  })
  if(+scrollCircles[2].textContent == 1) {
    scrollCircles[0].classList.add('scroll_disable');
    scrollCircles[1].classList.add('scroll_disable');
  }
})

scrollCircles[0].addEventListener('click', (event) => {
  scrollCircles[3].classList.remove('scroll_disable');
  scrollCircles[4].classList.remove('scroll_disable');
  scrollCircles[2].textContent = 1;
  numberRandomCollection[+scrollCircles[2].textContent - 1].forEach((item, index) => {
    cardPics[index].style.backgroundImage = `url(${cardsAnimal[item].img})`;
    cardsTitles[index].textContent = cardsAnimal[item].name;
  })
  scrollCircles[0].classList.add('scroll_disable');
  scrollCircles[1].classList.add('scroll_disable');
})