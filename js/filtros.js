"use strict";

/**@type {HTMLCanvasElement} */
let ctx = document.getElementById('canvas').getContext('2d');       //AREA DONDE SE VA A DIBUJAR
//let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let original;
let image_data;

let r;
let g;
let b;
let a = 255;

let porcBrillo = 10; 

//let imagenCanvas;

let btn = document.getElementById('original');
btn.addEventListener('click', originalImage);

let btn1 = document.getElementById("negative");
btn1.addEventListener('click', negativeFilter);

let btn2 = document.getElementById("brightness");
btn2.addEventListener('click', brightnessFilter);

let btn3 = document.getElementById("binarization");
btn3.addEventListener('click', binarizationFilter);

let btn4 = document.getElementById("sepia");
btn4.addEventListener('click', sepiaFilter);

let btn5 = document.getElementById("saturation");
btn5.addEventListener('click', saturationFilter);

let btn6 = document.getElementById("blur");
btn6.addEventListener('click', blurFilter);

function originalImage() {
    //ctx.getImageData(0, 0, width, height);
    if(original != null) 
        ctx.putImageData(original, 0, 0);
}

function negativeFilter() {
    image_data = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height);    
    for(let x = 0; x < image_data.width; x ++) {                       
        for(let y = 0; y < image_data.height; y ++) {
            r = 255 - getRed(image_data, x, y);
            g = 255 - getGreen(image_data, x, y);
            b = 255 - getBlue(image_data, x, y);
            setPixel(image_data, x, y, r, g, b, a);
        }
    }
    ctx.putImageData(image_data, 0, 0);                      
}

function brightnessFilter() {
    image_data = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height);       
    for(let x = 0; x < width; x ++) {                       
        for(let y = 0; y < height; y ++) {
            r = getRed(image_data, x, y) * porcBrillo / 10;
            g = getGreen(image_data, x, y) * porcBrillo / 10;
            b = getBlue(image_data, x, y) * porcBrillo / 10;
            if(r > 255) 
                r = 255;
            else if(r < 0)
                r = 0;
            if(g > 255) 
                g = 255;
            else if(g < 0)
                g = 0;
            if(b > 255) 
                b = 255;
            else if(b < 0)
                b = 0;
            setPixel(image_data, x, y, r, g, b, a);
        }
    }
    ctx.putImageData(image_data, 0, 0);                      
}

function definirBrillo(b){
    porcBrillo = b;
}

function binarizationFilter() {
    let negro = 0;
    let blanco = 255;
    image_data = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height);       
    for(let x = 0; x < width; x ++) {                       
        for(let y = 0; y < height; y ++) {
            let promedio = (getRed(image_data, x, y) + getGreen(image_data, x, y) + getBlue(image_data, x, y)) / 3;
            if(promedio > 127) {
                setPixel(image_data, x, y, blanco, blanco, blanco, a);
            } else {
                setPixel(image_data, x, y, negro, negro, negro, a);
            }
        }
    }
    ctx.putImageData(image_data, 0, 0);                      
}

function sepiaFilter() {
    image_data = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height);       
    for(let x = 0; x < width; x ++) {                       
        for(let y = 0; y < height; y ++) {
            r = getRed(image_data, x, y) * 0.393 + getGreen(image_data, x, y) * 0.769 + getBlue(image_data, x, y) * 0.189;
            g = getRed(image_data, x, y) * 0.349 + getGreen(image_data, x, y) * 0.686 + getBlue(image_data, x, y) * 0.168;
            b = getRed(image_data, x, y) * 0.272 + getGreen(image_data, x, y) * 0.534 + getBlue(image_data, x, y) * 0.131;
            setPixel(image_data, x, y, r, g, b, a);
        }
    }
    ctx.putImageData(image_data, 0, 0);                     
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

    image_data = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height);       
    for(let x = 0; x < width; x ++) {                       
        for(let y = 0; y < height; y ++) {
            r = getRed(image_data, x, y);
            g = getGreen(image_data, x, y);
            b = getBlue(image_data, x, y);
                
            arreglo = rgbAhsv(r, g, b);
            h = arreglo[0] ;
            s = arreglo[1] - 30;
            v = arreglo[2];
                
            arreglo1 = hsvArgb(h, s, v);
            r1 = arreglo1[0];
            g1 = arreglo1[1];
            b1 = arreglo1[2];
            setPixel(image_data, x, y, r1, g1, b1, a);
        }
    }
    ctx.putImageData(image_data, 0, 0);                      
}

function blurFilter() {
    image_data = ctx.getImageData(0, 0, width, height);      
    let image_data_blur = ctx.getImageData(0, 0, width, height);
    if(original == null)  
        original = ctx.getImageData(0, 0, width, height); 
    for(let x = 0; x < width; x ++) {                       
        for(let y = 0; y < height; y ++) {
            r = promedioRed(image_data, x, y);
            g = promedioGreen(image_data, x, y);
            b = promedioBlue(image_data, x, y);
            setPixel(image_data_blur, x, y, r, g, b, a);
        }
    }
    ctx.putImageData(image_data_blur, 0, 0);                      
}

//*************************************************************************************************************** */

function setPixel(imageData, x, y, r, g, b, a) {
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

function getGreen(imagedata, x, y) {
    let indice = (x + y * imagedata.width) * 4;
    return imagedata.data[indice + 1];
}

function getBlue(imagedata, x, y) {
    let indice = (x + y * imagedata.width) * 4;
    return imagedata.data[indice + 2];
}

//METODO QUE CONVIERTE LOS VALORES DE LOS COLORES DEL SISTEMA RGB A HSV
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
            //h = (60 * ((green - blue) / diferencia) + 360) % 360;
            //h = (((green - blue) / diferencia) + 6);
            h = (green - blue) / diferencia + (green < blue ? 6 : 0);
        } else {
            if(maximo == green) {
                //h = (60 * ((blue - red) / diferencia) + 120) % 360;
                h = (((blue - red) / diferencia) + 2);
            } else {
                if(maximo == blue) {
                    //h = (60 * ((red - green) / diferencia) + 240) % 360;
                    h = (((red - green) / diferencia) + 4);
                }
            }
        }
    }
    h = h / 6 * 360;
    if(maximo == 0) {
        s = 0;
    } else {
        s = (diferencia / maximo) * 100;
    }
    v = maximo * 100;
    return [h, s, v];
}

//METODO QUE CONVIERTE LOS VALORES DE LOS COLORES DEL SISTEMA HSV A RGB
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

//METODO QUE DEVUELVE EL PROMEDIO 
function promedioRed(image_data, x, y) {
    let suma = 0;;
    let cont = 0;;

    suma = getRed(image_data, x, y);
    cont ++;
    if(x + 1 < width) {
        suma += getRed(image_data, x + 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getRed(image_data, x + 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getRed(image_data, x + 1, y + 1);
            cont ++;
        }
    }
    if(x - 1 >= 0) {
        suma += getRed(image_data, x - 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getRed(image_data, x - 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getRed(image_data, x - 1, y + 1);
            cont ++;
        }
    }
    if(y - 1 >= 0) {
        suma += getRed(image_data, x, y - 1);
        cont ++;
    }
    if(y + 1 < height) {
        suma += getRed(image_data, x, y + 1);
        cont ++;
    }
    return suma / cont;
}

function promedioGreen(image_data, x, y) {
    let suma = 0;;
    let cont = 0;

    suma = getGreen(image_data, x, y);
    cont ++;
    if(x + 1 < width) {
        suma += getGreen(image_data, x + 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getGreen(image_data, x + 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getGreen(image_data, x + 1, y + 1);
            cont ++;
        }
    }
    if(x - 1 >= 0) {
        suma += getGreen(image_data, x - 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getGreen(image_data, x - 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getGreen(image_data, x - 1, y + 1);
            cont ++;
        }
    }
    if(y - 1 >= 0) {
        suma += getGreen(image_data, x, y - 1);
        cont ++;
    }
    if(y + 1 < height) {
        suma += getGreen(image_data, x, y + 1);
        cont ++;
    }
    return suma / cont;

}

function promedioBlue(image_data, x, y) {
    let suma = 0;
    let cont = 0;

    suma = getBlue(image_data, x, y);
    cont ++;
    if(x + 1 < width) {
        suma += getBlue(image_data, x + 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getBlue(image_data, x + 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getBlue(image_data, x + 1, y + 1);
            cont ++;
        }
    }
    if(x - 1 >= 0) {
        suma += getBlue(image_data, x - 1, y);
        cont ++;
        if(y - 1 >= 0) {
            suma += getBlue(image_data, x - 1, y - 1);
            cont ++;
        }
        if(y + 1 < height) {
            suma += getBlue(image_data, x - 1, y + 1);
            cont ++;
        }
    }
    if(y - 1 >= 0) {
        suma += getBlue(image_data, x, y - 1);
        cont ++;
    }
    if(y + 1 < height) {
        suma += getBlue(image_data, x, y + 1);
        cont ++;
    }
    return suma / cont;
}
