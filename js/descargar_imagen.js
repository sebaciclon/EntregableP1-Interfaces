"use strict";

/**@type {HTMLCanvasElement} */

let btn_descargar = document.getElementById("descargar");
btn_descargar.addEventListener('click', descargarImagen);

function descargarImagen() {
    //let canvas = document.getElementById("micanvas");
    let link = window.document.createElement('a');
    let url = canvas.toDataURL();
    let filename = 'imagCanvas.jpg';

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
}