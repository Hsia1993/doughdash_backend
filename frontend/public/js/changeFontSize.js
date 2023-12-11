function changeFontSize(delta) {
    const body = document.querySelector('body');
    const currentSize = window.getComputedStyle(body).fontSize;
    const newSize = parseFloat(currentSize) + delta;
    body.style.fontSize = newSize + 'px';

    // Disable buttons based on the delta value
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
