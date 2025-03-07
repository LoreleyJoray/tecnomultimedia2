// Comisión de Matías - Joray (77302/9); Esteban (93509/6); Galasso (94698/3); Farías Jomñuk (86909/7).
// Video explicativo: https://youtu.be/i5E8lyjL_Lk

let monitorear = true;

let AMP_MIN = 0.020;
let AMP_MAX = 0.10;

let FREC_MIN = 20;
let FREC_MAX = 800;

let mic;
let pitch;
let audioCotext;

let gestorAmp;
let gestorPitch;

let haySonido; // estado de cómo está el sonido en cada momento
let antesHabiaSonido; // moemoria del estado anterior del sonido

let estado = "inicio";
let columnas = [];
let cantidadFilas = 41;
let cantidadColumnas = 1;
let cantidadCeldas = 41;

let colorPaleta;
let imagenPaleta = [];

let marca;  

const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

function preload() {
  let urls_img = [
    "paleta/paleta_1.png",
    "paleta/paleta_2.png",
    "paleta/paleta_3.png",
    "paleta/paleta_4.png",
  ];

  // Carga de las imágenes de trazos figura en el array imagen_paleta_fondo
  for (let i = 0; i < urls_img.length; i++) {
    loadImage(urls_img[i], (img) => {
      imagenPaleta.push(img); // inicio la imagen cargada al array
    });
  }
}

//FILAS Y COLUMNAS
let ac;
let colorRandom;
let numfilas;
let altorect;
let numcol;
let segmentos = [];  //arreglo para separar segmentos
let numsegmentos;


function setup() {
  createCanvas(displayWidth, displayHeight);

  audioContext = getAudioContext(); // inicia el motor de audio
  mic = new p5.AudioIn(); // inicia el micrófono
  mic.start(startPitch); // se enciende el micrófono y le transmito el analisis de frecuencia (pitch) al micrófono. Conecto la libreria con el micrófono

  userStartAudio(); // por la dudas para forzar inicio de audio en algunos navegadores

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);

  colorMode(HSB, 360, 100, 100, 1);
  colorPaleta = new paleta(imagenPaleta);

  antesHabiaSonido = false;

  ac = width / 101;
  colorRandom = random(10, 360);
  numfilas = floor(height / (height / 10));
  numcol = 41;
  altorect = height / 10;
  numsegmentos = 10;

}

function draw() {

  let vol = mic.getLevel(); // cargo en vol la amplitud del micrófono (señal cruda);
  gestorAmp.actualizar(vol);

  haySonido = gestorAmp.filtrada > 0.1; // umbral de ruido que define el estado haySonido

  let inicioElSonido = haySonido && !antesHabiaSonido; // evendo de INICIO de un sonido
  let finDelSonido = !haySonido && antesHabiaSonido; // evento de fIN de un sonido
  //columnas[cantidadColumnas] = new Columna();
  //columnas[1](colorPaleta, cantidadCeldas).dibujar();

  if (estado == "inicio") {
    background(0);
    fila(15, altorect / 2);
    
    //filas1(ac,map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 100, height/8));
    //filas2(ac,map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 255, height));

    if (inicioElSonido) {
      fila(5, altorect / 2);

        /*for(let i=0; i<cantidadColumnas; i++){
        columnas[i] = new Columna();
        columnas.dibujar();*/
      }

    }

    if (haySonido) {
      //filas1(ac,map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 100, height/8));
      //filas2(ac,map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 255, height));
      fila(5, altorect / 2);

      //Estado
      //columnas[cantidadColumnas] = new Columna();
      
    }

    if (finDelSonido) {
      //Evento
      marca = millis();
    }
    if (!haySonido) {
      //Estado SILENCIO
      let ahora = millis();
    }

  
    
    function fila (brillov1, posrect) {
      

      for (let j = 0; j < numfilas; j++) { // Bucle adicional para las filas
        for (let i = 0; i < 101; i++) {
          push();
          rectMode(CENTER);
          fill(map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, altorect), 200, map(sin((frameCount * 0.1 + i) * 0.4), -1, brillov1, 0, 255));
                                //HUE                                  SAT                           BRILLO                        
          rect(ac * i, posrect + j * altorect, ac, map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 82, altorect));
          pop();
        }
      }
    }
      

    /*function filas1(cantidad, tono){
      for(let j=0; j<numfilas; j++){
        for (let i = 0; i < cantidad; i++) {
          push();
          rectMode(CENTER);
          fill(tono, 50, map(sin((frameCount * 0.1 + i) * 0.4), -1, 1, 0, 255));
          // noStroke();
          rect(cantidad * i + 2, altorect * j * 2 , ac, map(gestorAmp.filtrada, AMP_MIN + AMP_MAX, AMP_MAX, 100, height/8)/4);
          pop();
          }
        }
      }
    
      function filas2(cantidad, tono){
        for(let j=0; j<numfilas; j++){
          for (let i = 0; i < cantidad; i++) {
            push();
            rectMode(CENTER);
            fill(tono, 25, map(sin((frameCount * 0.1 + i) * 0.4), -1, 5, 0, 255));
            // noStroke();
            rect(cantidad * i+ 2, altorect/2 + j * altorect , ac, map(gestorAmp.filtrada, AMP_MIN, AMP_MAX-AMP_MIN, 200, height/8)/4);
            pop();
            }
          }
        }
          */

    //altorect / 2 + j * altorect
/*
  }else if (estado == "grosor"){

    if(inicioElSonido){ //Evento
    }
  
    if(haySonido){ //Estado
      for(let i=0; i<cantidad; i++){
        rectangulos[i].setGrosor(gestorPitch.filtrada);
      }
    }

    if(finDelSonido){//Evento
      marca = millis();
    }

    if(!haySonido){ //Estado SILENCIO
      let ahora = millis();
      if(ahora > marca + tiempoLimiteGrosor){

        estado = "color";
        marca = millis();
      }
    }

  }else if (estado == "color"){

    if(inicioElSonido){ //Evento
     
    }
  
    if(haySonido){ //Estado
      elColor = lerpColor( colorInicial, colorFinal, gestorPitch.filtrada);
    }

    if(finDelSonido){//Evento
      marca = millis();
    }
    
    if(!haySonido){ //Estado SILENCIO
      let ahora = millis();
      if(ahora > marca + tiempoLimiteColor){

        estado = "fin";
        marca = millis();
      }
    }
    
  }else if (estado == "fin"){

    if(inicioElSonido){ //Evento
      marca = millis();
    }
  
    if(haySonido){ //Estado

      let ahora = millis();
      if(ahora > marca + tiempoLimiteFin){
        estado = "reinicio";
        marca = millis();
      }
    }

    if(finDelSonido){//Evento
    }
    
    if(!haySonido){ //Estado SILENCIO
    }
    
  }else if (estado == "reinicio"){

    rectangulos =  [];
    cantidad = 0;
    estado = "inicio";
    elColor = color(0);
    marca = millis();
  }
*/
    if (monitorear) {
      gestorAmp.dibujar(100, 100);
      gestorPitch.dibujar(500, 100);
    }

    printData();
    antesHabiaSonido = haySonido;
  }

// ---- Debug ---
  function printData(){
    //background(255);
    console.log(estado);
    console.log(gestorAmp.filtrada);
    console.log(gestorPitch.filtrada);
    }

// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency);
      //console.log(frequency);
    }
    getPitch();
  });
}


