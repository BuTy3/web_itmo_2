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

try {
    document.getElementById('home_button').onclick = function() {
        window.location.href = "http://localhost:21511/web_server-1.0-SNAPSHOT/index.jsp";
    };
} catch {}