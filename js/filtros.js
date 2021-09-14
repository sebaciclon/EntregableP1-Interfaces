"use strict";

let ctx = document.getElementById('canvas').getContext('2d');       //AREA DONDE SE VA A DIBUJAR
let width = canvas.width;
let height = canvas.height;

let r;
let g;
let b;
let a = 255;

let btn = document.getElementById('original');
btn.addEventListener('click', originalImage);

let btn1 = document.getElementById("negative");
btn1.addEventListener('click', negativeFilter);

//let btn2 = document.getElementById("brightness");
//btn2.addEventListener('click', brightnessFilter);

let btn3 = document.getElementById("binarization");
btn3.addEventListener('click', binarizationFilter);

let btn4 = document.getElementById("sepia");
btn4.addEventListener('click', sepiaFilter);

function originalImage() {
    let image = new Image();
    image.src = "images/flores.jpg";
    image.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image, 0, 0);
    }
}

function negativeFilter() {
    let image1 = new Image();
    image1.src = "images/flores.jpg";
    image1.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image1, 0, 0);
            
        let image_data = ctx.getImageData(0, 0, image1.width, image1.height);      
        for(let x = 0; x < image1.width; x ++) {                       
            for(let y = 0; y < image1.height; y ++) {
                r = 255 - getRed(image_data, x, y);
                g = 255 - getGrenn(image_data, x, y);
                b = 255 - getBlue(image_data, x, y);
                sexPixel(image_data, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(image_data, 0, 0);                      
    }                                                           
}

function binarizationFilter() {
    let negro = 0;
    let blanco = 255;
    
    let image1 = new Image();
    image1.src = "images/flores.jpg";
    image1.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image1, 0, 0);
            
        let image_data = ctx.getImageData(0, 0, image1.width, image1.height);      
        for(let x = 0; x < image1.width; x ++) {                       
            for(let y = 0; y < image1.height; y ++) {
                let promedio = (getRed(image_data, x, y) + getGrenn(image_data, x, y) + getBlue(image_data, x, y)) / 3;
                if(promedio > 127) {
                    sexPixel(image_data, x, y, blanco, blanco, blanco, a);
                } else {
                    sexPixel(image_data, x, y, negro, negro, negro, a);
                }
            }
        }
        ctx.putImageData(image_data, 0, 0);                      
    }                                                           
}

function sepiaFilter() {
    let image1 = new Image();
    image1.src = "images/flores.jpg";
    image1.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image1, 0, 0);
        let image_data = ctx.getImageData(0, 0, image1.width, image1.height);      
        for(let x = 0; x < image1.width; x ++) {                       
            for(let y = 0; y < image1.height; y ++) {
                r = getRed(image_data, x, y) * 0.393 + getGrenn(image_data, x, y) * 0.769 + getBlue(image_data, x, y) * 0.189;
                g = getRed(image_data, x, y) * 0.349 + getGrenn(image_data, x, y) * 0.686 + getBlue(image_data, x, y) * 0.168;
                b = getRed(image_data, x, y) * 0.272 + getGrenn(image_data, x, y) * 0.534 + getBlue(image_data, x, y) * 0.131;
                sexPixel(image_data, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(image_data, 0, 0);                     
    }                                                           
}

function sexPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function getRed(imagedata, x, y) {
    let indice = (x + y * imagedata.width) * 4;
    return imagedata.data[indice + 0];
}

function getGrenn(imagedata, x, y) {
    let indice = (x + y * imagedata.width) * 4;
    return imagedata.data[indice + 1];
}

function getBlue(imagedata, x, y) {
    let indice = (x + y * imagedata.width) * 4;
    return imagedata.data[indice + 2];
}
