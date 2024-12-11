function checkOnlyOne(checkbox) {
    var checkboxes = document.getElementsByName('y');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}

const themeToggleButton = document.getElementById('thema-button');
var flag_theme = document.documentElement.classList.contains('dark-theme');

function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    flag_theme = document.documentElement.classList.contains('dark-theme');
    if (flag_theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

themeToggleButton.addEventListener('click', toggleTheme);