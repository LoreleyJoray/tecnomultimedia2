class Columna {
    constructor(paleta, cantidadCeldas){
        this.grosor = 1;
        this.tinte = hue(paleta.darUnColor());
        this.cantidad = width / cantidadCeldas;
    }

    dibujar(){
        background(0);
        push()
        //rectMode(CENTER);
        for (let i = 0; i < cantidadCeldas; i++) {
            // new Celda (color, alto, ancho);
            strokeWeight( this.grosor);
            fill(this.tinte, 100, map(sin((frameCount * 0.1 + i) * 0.4), -1, 5, 0, 255));
            rect(this.cantidad * i, 0, this.cantidad, mouseY);
          }
        pop();
    }
  
}

/*class Rectangulo {
    constructor(x, y, width, maxHeight) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.maxHeight = maxHeight;
    }
  
    dibujar() {
      push();
      rectMode(CENTER);
      fill(map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, this.maxHeight), 100, map(sin((frameCount * 0.1 + this.x / this.width) * 0.4), -1, 5, 0, 255));
      rect(this.x, this.y, this.width, map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, this.maxHeight));
      pop();
    }
  }

  */