"use strict";

let ctx = document.getElementById('canvas').getContext('2d');       //AREA DONDE SE VA A DIBUJAR
let width = canvas.width;
let height = canvas.height;

let btn = document.getElementById('upload');
btn.addEventListener('click', uploadImage);

let btn1 = document.getElementById("negative");
btn1.addEventListener('click', negativeFilter);

let btn2 = document.getElementById("brightness");
btn1.addEventListener('click', brightnessFilter);

let btn3 = document.getElementById("binarization");
btn1.addEventListener('click', binarizationFilter);

let btn4 = document.getElementById("sepia");
btn1.addEventListener('click', sepiaFilter);