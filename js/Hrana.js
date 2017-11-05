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

    let matStupac = floor(random(stupac)) * resetka;
    let matRedak  = floor(random(redak))  * resetka;

    if(zmija.x === matStupac && zmija.y === matRedak){
      this.novaHrana();
    }

    this.x = matStupac;
    this.y = matRedak;

  }
}
