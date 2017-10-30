function Hrana(){
  this.x = 300;
  this.y = 250;

  this.stvoriHranu = function(){
    fill(ihrana);
    rect(this.x, this.y, resetka, resetka);
  }

  this.novaHrana = function(){
    let stupac = rezolucija.sirina / resetka;
    let redak  = rezolucija.visina / resetka;

    this.x = floor(random(stupac)) * resetka;
    this.y = floor(random(redak))  * resetka;

    
    if(zmija.x === this.x && zmija.y === this.y){
      this.novaHrana();
    }
  }
}
