// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

function changeFontSize(delta) {
    const body = document.querySelector('body');
    const currentSize = window.getComputedStyle(body).fontSize;
    const newSize = parseFloat(currentSize) + delta;
    body.style.fontSize = newSize + 'px';

    const minusButton = document.getElementById('minusButton');
    const plusButton = document.getElementById('plusButton');

    if (delta < 0) {
        minusButton.disabled = true;
        plusButton.disabled = false;
    } else if (delta > 0) {
        minusButton.disabled = false;
        plusButton.disabled = true;
    }
}
