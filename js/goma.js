"use strict";

/**@type {HTMLCanvasElement} */

//let canvas = document.getElementById('canvas');
//let ctx = canvas.getContext("2d");

let rectCanvasBorrado = canvas.getBoundingClientRect(); //posición del canvas respecto de la pantalla (borde derecho y superior)
x = 0, y = 0;
let borrando = false;
let agarrar_goma = false;
let color_borrado = 'white';
let grosor_borrado = 20;

let btn_borrar = document.getElementById('borrar');
btn_borrar.addEventListener('click', agarrarGoma);

let btn_limpiar = document.getElementById('limpiar');
btn_limpiar.addEventListener('click', limpiar);

function agarrarGoma(){ //Selecciona la herramienta goma para trabajar
    agarrar_goma = true;
    agarrar_lapiz = false;
}

canvas.addEventListener('mousedown', function(e){ //e es dónde se hizo clic en la pantalla.
    x = e.clientX - rectCanvasBorrado.left; //valor en x donde se hizo click sobre el canvas
    y = e.clientY - rectCanvasBorrado.top; //valor en y donde se hizo click sobre el canvas
    borrando = true; //el mouse está presionado

});

canvas.addEventListener('mousemove', function(e){
    let x1 = e.clientX - rectCanvasBorrado.left; // valor en x por donde se mueve el mause
    let y1 = e.clientY - rectCanvasBorrado.top; // valor en y por donde se mueve el mause
    if(borrando == true){
        borrar(x, y, x1, y1);
        x = x1; //nuevo valor inicial en x
        y = y1; //nuevo valor inicial en y
    }
});

canvas.addEventListener('mouseup', function(e){ //e es dónde se dejó de hacer click
    let x1 = e.clientX - rectCanvasBorrado.left; // valor en x donde se dejó de hacer click
    let y1 = e.clientY - rectCanvasBorrado.top; // valor en y donde se dejó de hacer click
    if(borrando == true){
        borrar(x, y, x1, y1); //dibujamos la última linea
        x = 0; //nuevo valor inicial en x (vuelve a la posición inicial)
        y = 0; //nuevo valor inicial en y (vuelve a la posición inicial)
        borrando = false; //deja de dibujar aunque se mueva el mouse
    }
});

function borrar(x1, y1,x2, y2){
    if(agarrar_goma == true){
        dibujando = false;
        ctx.beginPath(); //comenzamos una ruta nueva
        ctx.strokeStyle = color_borrado; //definimos con el color que vamos a dibujar
        ctx.lineWidth = grosor_borrado; //definimos el grosor de la linea de dibujo
        ctx.moveTo(x1, y1); //mover o posicionar el lápiz a la posición inicial
        ctx.lineTo(x2, y2); //dibujamos una linea hasta el valor final
        ctx.stroke(); //dibujamos lineas y no areas cerradas
        ctx.closePath();
    }
}

function limpiar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

