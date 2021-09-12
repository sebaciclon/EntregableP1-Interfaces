"use strict";

let ctx = document.getElementById('canvas').getContext('2d');       //AREA DONDE SE VA A DIBUJAR
let width = canvas.width;
let height = canvas.height;

let r;
let g;
let b;
let a = 255;

let btn = document.getElementById('upload');
btn.addEventListener('click', uploadImage);

let btn1 = document.getElementById("negative");
btn1.addEventListener('click', negativeFilter);

/*let btn2 = document.getElementById("brightness");
btn2.addEventListener('click', brightnessFilter);

let btn3 = document.getElementById("binarization");
btn3.addEventListener('click', binarizationFilter);

let btn4 = document.getElementById("sepia");
btn4.addEventListener('click', sepiaFilter);*/

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

function uploadImage() {
    let image = new Image();
    image.src = "images/EscudoTransparente.png";
    image.onload = function() {
        ctx.drawImage(image, 0, 0);
        //myDrawImageMethod(this);
    }
}



function negativeFilter() {
    
    let grey;

    let image1 = new Image();
    image1.src = "images/EscudoTransparente.png";
    image1.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image1, 0, 0);
            
        let image_data = ctx.getImageData(0, 0, width, height);     //RETORNA UN OBJETO IMAGEDATA QUE REPRESENTA LOS DATOS DE PIXELES PARA EL AREA DEL CANVAS. 
        for(let x = 0; x < width; x ++) {                       
            for(let y = 0; y < height; y ++) {
                r = 255 - getRed(image_data, x, y);
                g = 255 - getGrenn(image_data, x, y);
                b = 255 - getBlue(image_data, x, y);
                sexPixel(image_data, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(image_data, 0, 0);                      //DIBUJA LA INFORMACION DE PIXELES EN EL CANVAS. LOS VALORES SON LAS COORDENADAS EN X E Y DE DONDE
    }                                                           //EMPIEZA A DIBUJAR

}
