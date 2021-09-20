"use strict";

/**@type {HTMLCanvasElement} */

let btn_cargar = document.getElementById("cargar");
btn_cargar.addEventListener('change', cargarImagen);

function cargarImagen(){
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
                ctx.drawImage(imagenCanvas, 0, 0);
            }
        }
}
    else //Si no es imagen se avisa del error al seleccionar el archivo
        {
            alert("Solamente archivos jpg, jpeg y png");
        }   
}