export const btnBurger = document.querySelector('.burger');
export const headerNav = document.querySelector('.header_nav');
export const headerLogo = document.querySelector('.header_logo');
export const blockDark = document.querySelector('.dark-block');

const burger = {
  changeBurger: function() {
    headerLogo.classList.toggle("header_logo_hidden");
    headerNav.classList.toggle("burger_show");
    btnBurger.classList.toggle("burger_rotate");
    document.body.classList.toggle("stop-scrolling");
    blockDark.classList.toggle("dark-block_active");
  }
};

export default burger;

