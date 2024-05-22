const btnDarkMode = document.querySelector("#darkMode");
const html = document.querySelector("html");
let darkMode = false;

const themeChange = () => {
    darkMode = !darkMode;
    btnDarkMode.classList.toggle("header__btn--dark-mode");
    html.classList.toggle("dark-mode");

    localStorage.setItem("theme", JSON.stringify(darkMode));
}
btnDarkMode.addEventListener("click", themeChange);

const checkTheme = () => {
    darkMode = JSON.parse(localStorage.getItem("theme"));

    if(darkMode){
        btnDarkMode.classList.add("header__btn--dark-mode");
        html.classList.add("dark-mode");
    }
}

export {themeChange ,checkTheme};