"use strict";

/**@type {HTMLCanvasElement} */

let canvas = document.getElementById('canvas');

let rectCanvas = canvas.getBoundingClientRect(); //posición del canvas respecto de la pantalla (borde derecho y superior)
let x = 0, y = 0;
let dibujando = false;
let color = 'black';
let grosor = 1;
let agarrar_lapiz = false;

let btn_dibujar = document.getElementById('dibujar');
btn_dibujar.addEventListener('click', agarrarLapiz);


function agarrarLapiz(){ //Selecciona la herramienta lapiz para trabajar
    agarrar_lapiz = true;
    agarrar_goma = false;
}

//Metodo que obtiene el color seleccionado por el usuario
function definirColor(c){
    color = c;
}

//Metodo que obtiene el grosor de lápiz seleccionado por el usuario
function definirGrosor(g){
    grosor = g;
}

//Se captura el evento de hacer clic y se obtiene las coordenados de dónde se hizo clic
canvas.addEventListener('mousedown', function(e){ //e es dónde se hizo clic en la pantalla.
    x = e.clientX - rectCanvas.left; //valor en x donde se hizo click sobre el canvas
    y = e.clientY - rectCanvas.top; //valor en y donde se hizo click sobre el canvas
    dibujando = true; //el mouse está presionado

});

//Se captura el evento de movimiento del mouse. Se obtiene las coordenadas finales del movimiento.
//Si está seleccionada la herramienta para dibujar, traza la linea.
//Posiciona las nuevas coordenadas iniciales en las finales del movimiento 
canvas.addEventListener('mousemove', function(e){
    let x1 = e.clientX - rectCanvas.left; // valor en x por donde se mueve el mause
    let y1 = e.clientY - rectCanvas.top; // valor en y por donde se mueve el mause
    if(dibujando == true){
        dibujar(x, y, x1, y1);
        x = x1; //nuevo valor inicial en x
        y = y1; //nuevo valor inicial en y
    }
});

//Captura el evento de soltar el clic. Dibuja la última linea. Posiciona las coordenadas iniciales en 0.
//Setea la herramienta lápiz para que ya no dibuje al mover el mouse.
canvas.addEventListener('mouseup', function(e){ //e es dónde se dejó de hacer click
    let x1 = e.clientX - rectCanvas.left; // valor en x donde se dejó de hacer click
    let y1 = e.clientY - rectCanvas.top; // valor en y donde se dejó de hacer click
    if(dibujando == true){
        dibujar(x, y, x1, y1); //dibujamos la última linea
        x = 0; //nuevo valor inicial en x (vuelve a la posición inicial)
        y = 0; //nuevo valor inicial en y (vuelve a la posición inicial)
        dibujando = false; //deja de dibujar aunque se mueva el mouse
    }
});

//Metodo que dibuja una linea.
function dibujar(x1, y1, x2, y2){
    if(agarrar_lapiz == true){
        ctx.beginPath(); //comenzamos una ruta nueva
        ctx.strokeStyle = color; //definimos con el color que vamos a dibujar
        ctx.lineWidth = grosor; //definimos el grosor de la linea de dibujo
        ctx.lineCap = "round"; //dibuja trazo redondo
        ctx.moveTo(x1, y1); //mover o posicionar el lápiz a la posición inicial
        ctx.lineTo(x2, y2); //dibujamos una linea hasta el valor final
        ctx.stroke(); //dibujamos lineas y no areas cerradas
        ctx.closePath();
    }
}




