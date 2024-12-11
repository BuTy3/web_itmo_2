
var example = document.getElementById("example"),
    ctx = example.getContext('2d');
ctx.translate(example.width / 2, example.height / 2);

function base(r) {

    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 2 || r > 4) {
        alert("Пожалуйста, введите R от 2 до 4");
        return;
    }
    const scale = r / 3;

    ctx.beginPath();
    ctx.strokeStyle = flag_theme ? 'white' : 'black';
    ctx.moveTo(-130, 0);
    ctx.lineTo(130, 0);
    ctx.lineTo(125, -5);
    ctx.moveTo(130, 0);
    ctx.lineTo(125, 5);
    ctx.moveTo(0, 130);
    ctx.lineTo(0, -130);
    ctx.lineTo(5, -125);
    ctx.moveTo(0, -130);
    ctx.lineTo(-5, -125);
    ctx.moveTo(130 * scale / 3, -5);
    ctx.lineTo(130 * scale / 3, 5);
    ctx.moveTo(260 * scale / 3, -5);
    ctx.lineTo(260 * scale / 3, 5);
    ctx.moveTo(-130 * scale / 3, -5);
    ctx.lineTo(-130 * scale / 3, 5);
    ctx.moveTo(-260 * scale / 3, -5);
    ctx.lineTo(-260 * scale / 3, 5);
    ctx.moveTo(5, -130 * scale / 3);
    ctx.lineTo(-5, -130 * scale / 3);
    ctx.moveTo(5, -260 * scale / 3);
    ctx.lineTo(-5, -260 * scale / 3);
    ctx.moveTo(5, 130 * scale / 3);
    ctx.lineTo(-5, 130 * scale / 3);
    ctx.moveTo(5, 260 * scale / 3);
    ctx.lineTo(-5, 260 * scale / 3);
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = flag_theme ? 'white' : 'black';
    ctx.fillText('X', 125, -15);
    ctx.fillText('Y', 15, -125);
    ctx.fillText('R', 10, -260 * scale / 3 + 3);
    ctx.fillText('R/2', 10, -130 * scale / 3 + 3);
    ctx.fillText('- R/2', 10, 130 * scale / 3 + 3);
    ctx.fillText('- R', 10, 260 * scale / 3 + 3);
    ctx.fillText('- R', -260 * scale / 3 - 10, -10);
    ctx.fillText('- R/2', -130 * scale / 3 - 12, -10);
    ctx.fillText('R/2', 130 * scale / 3 - 5, -10);
    ctx.fillText('R', 260 * scale / 3 - 5, -10);
}

function shapes(r) {

    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 2 || r > 4) {
        alert("Пожалуйста, введите R от 2 до 4");
        return;
    }
    const scale = r / 3;

    // треугольник
    ctx.beginPath();
    ctx.moveTo(0, -130 * scale / 3);
    ctx.lineTo(-130 * scale / 3, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.fillStyle = 'blue';
    // прямоугольник
    ctx.fillRect(0, 0, -130 * scale / 3, 260 * scale / 3);
    // 1/4 круга
    ctx.beginPath();
    ctx.arc(0, 0, 260 * scale / 3, 0, -3 * Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

shapes(3);
base(3);