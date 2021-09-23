"use strict";

/**@type {HTMLCanvasElement} */
//let ctx = document.getElementById('canvas').getContext('2d');
let imageWidth;
let imageHeight;
let proporcion;

let btn_cargar = document.getElementById("cargar");
btn_cargar.addEventListener('change', cargarImagen);

function cargarImagen(){
    limpiar();
    //Verificamos el tipo de archivo
    let nombre_archivo = document.getElementById("cargar").value;
    let index = nombre_archivo.lastIndexOf(".") + 1;
    let ext_archivo = nombre_archivo.substr(index, nombre_archivo.length).toLowerCase();
    //Si es una imagen procedemos
    if (ext_archivo == "jpg" || ext_archivo == "jpeg" || ext_archivo == "png"){
        let archivo = document.getElementById("cargar").files[0];
        let reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            let imagenCanvas = new Image();
            imagenCanvas.src = reader.result;
            imagenCanvas.onload = function() {
                imageWidth = imagenCanvas.width;
                imageHeight = imagenCanvas.height;

                if(imageWidth <= width && imageHeight <= height)
                    ctx.drawImage(imagenCanvas, 0, 0);
                else {
                    if(imageHeight > imageWidth) {
                        proporcion = (height * 100) / imageHeight;
                        imageWidth = imageWidth * (proporcion / 100);
                        imageHeight = imageHeight * (proporcion / 100);
                    } else {
                        if(imageWidth > imageHeight) {
                            proporcion = (width * 100) / imageWidth;
                            imageWidth = imageWidth * (proporcion / 100);
                            imageHeight = imageHeight * (proporcion / 100);
                        } else {
                            imageWidth = imageWidth * (((width * 100) / imageWidth) / 100);
                            imageHeight = imageHeight * (((height * 100) / imageHeight) / 100);
                        }
                    }
                }
                ctx.drawImage(imagenCanvas, 0, 0, imageWidth, imageHeight);
            }
        }
    } else { //Si no es imagen se avisa del error al seleccionar el archivo
        alert("Solamente archivos jpg, jpeg y png");
    }   
}


  

