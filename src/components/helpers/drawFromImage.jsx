export default function drawFromImage(x, y, grafics, toImg, mode) {
    switch (mode) {
        case 1:
            grafics.drawImage(toImg.current, x - 219, y + 1);
            break;

        case 2:
            grafics.drawImage(toImg.current, 0, 0, toImg.current.width, toImg.current.height, 0, 0, 1610, 981);
            break;

        default:
            break;
    }

}