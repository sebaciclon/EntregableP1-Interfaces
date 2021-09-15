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

let btn5 = document.getElementById("saturation");
btn5.addEventListener('click', saturationFilter);

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

function saturationFilter() {
    let arreglo = new Array();
    let arreglo1 = new Array();
    let h;
    let s;
    let v;
    let r1;
    let g1;
    let b1;

    let image1 = new Image();
    image1.src = "images/flores.jpg";
    image1.onload = function() {
        //myDrawImageMethod(this);
        ctx.drawImage(image1, 0, 0);
         
        let image_data = ctx.getImageData(0, 0, image1.width, image1.height);      
        for(let x = 0; x < image1.width; x ++) {                       
            for(let y = 0; y < image1.height; y ++) {
                r = getRed(image_data, x, y);
                g = getGrenn(image_data, x, y);
                b = getBlue(image_data, x, y);
                
                arreglo = rgbAhsv(r, g, b);
                h = arreglo[0] ;
                s = arreglo[1] - 30;
                v = arreglo[2];
                
                arreglo1 = hsvArgb(h, s, v);
                r1 = arreglo1[0];
                g1 = arreglo1[1];
                b1 = arreglo1[2];
                sexPixel(image_data, x, y, r1, g1, b1, a);
            }
        }
        ctx.putImageData(image_data, 0, 0);                      
    }                                                           
}

//*************************************************************************************************************** */

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

function rgbAhsv(r, g, b) {
    let red = r / 255.0;
    let green = g / 255.0;
    let blue = b / 255.0;
    let h;
    let s;
    let v;

    let minimo = Math.min(red, green, blue);
    let maximo = Math.max(red, green, blue);
    let diferencia = maximo - minimo;

    if(minimo == maximo) {
        h = 0;
    } else {
        if(maximo == red) {
            h = (60 * ((green - blue) / diferencia) + 360) % 360;
        } else {
            if(maximo == green) {
                h = (60 * ((blue - red) / diferencia) + 120) % 360;
            } else {
                if(maximo == blue) {
                    h = (60 * ((red - green) / diferencia) + 240) % 360;
                }
            }
        }
    }
    if(maximo == 0) {
        s = 0;
    } else {
        s = (diferencia / maximo) * 100;
    }
    v = maximo * 100;
    return [h, s, v];
}

function hsvArgb(h,s,v) {
    s = s / 100;
    v = v / 100;
      
    let c = s * v;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = v -c;
    let r = 0;
    let g = 0;
    let b = 0;

    if(0 <= h && h < 60) {
        r = c; g = x; b = 0; 
    } else {
        if(60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else {
            if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
            } else {
                if (180 <= h && h < 240) {
                    r = 0; g = x; b = c;
                } else {
                    if (240 <= h && h < 300) {
                        r = x; g = 0; b = c;
                    } else {
                        if (300 <= h && h < 360) {
                            r = c; g = 0; b = x;
                        }
                    }
                }
            }
        }
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
        
    return [r, g, b]; 
}
