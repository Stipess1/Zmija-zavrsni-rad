function Hrana(){
  this.x = 300;
  this.y = 250;

  this.stvoriHranu = function(){
    fill(ihrana);
    rect(this.x, this.y, resetka, resetka);
  }

  this.novaHrana = function(){
    let stupac = width / resetka;
    let redak  = height / resetka;

    this.x = floor(random(stupac)) * resetka;
    this.y = floor(random(redak))  * resetka

    /*
      Zna se desit kada je zmija velika da se hrana stvori na repu
      pomocu for petlje gledamo jel se hrana stvorila na repu ako je
      zovi opet novaHrana()
    */
    for(let i = 0; i < zmija.rep.length; i++){
      let pos = zmija.rep[i];
      if(pos.x === hrana.x && pos.y === hrana.y)
        this.novaHrana();
    }
    //print(this.x + " " + this.y);
  }
}
