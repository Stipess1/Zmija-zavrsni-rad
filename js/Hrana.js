function Hrana(){
  this.x = rezolucija.sirina / 2;
  this.y = rezolucija.visina / 2;

  this.stvoriHranu = function(){
    fill(ihrana);
    rect(this.x, this.y, resetka, resetka);
  }

  this.novaHrana = function(){
    let stupac = rezolucija.sirina / resetka;
    let redak  = rezolucija.visina / resetka;

    let matStupac = floor(random(stupac)) * resetka;
    let matRedak  = floor(random(redak))  * resetka;

    if(zmija.x === matStupac && zmija.y === matRedak){
      this.novaHrana();
    }
    if(multiplayer){
      if(zmija2.x == matStupac && zmija2.y == matRedak){
        this.novaHrana();
      }
    }

    this.x = matStupac;
    this.y = matRedak;

  }
}
