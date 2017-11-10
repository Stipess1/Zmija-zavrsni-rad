function Zmija(){

  this.x = 60;
  this.y = 60;
  this.xbrzina = 0;
  this.ybrzina = 0;
  this.bodovi = 0;
  this.rep = [];
  this.smjer = [];

  this.prikazi = function(bool){
    if(this.rep.length === this.bodovi){
      for(let i = 0; i < this.rep.length; i++){
        this.rep[i] = this.rep[i+1];
      }
    }
    this.rep[this.bodovi-1] = createVector(this.x, this.y);
    for(let i = 0; i < this.rep.length; i++){
      let pos = this.rep[i];
      if (bool) {
        fill(rep);
      } else {
        fill(23, 168, 54);
      }
      noStroke();
        rect(this.rep[i].x, this.rep[i].y, resetka, resetka);
    }

    this.x += this.xbrzina * resetka;
    this.y += this.ybrzina * resetka;

    if(bool)
      fill(glava);
    else
      fill(165, 165, 165);
    noStroke();
    rect(this.x, this.y, resetka, resetka);

  }

  this.rubovi = function(){
    if(!rubovi){
      if(this.x >= rezolucija.sirina)
        this.x = 0;
      else if(this.y >= rezolucija.visina)
        this.y = 0;
      else if(this.x < 0)
        this.x = rezolucija.sirina - 20;
      else if(this.y < 0)
        this.y = rezolucija.visina - 20;
    }
    else {
      if(this.x >= width || this.y >= height || this.y < 0 || this.x < 0){
        this.kraj();
      }
    }
  }

  this.provjeriSmjer = function(){
    if(this.smjer.length){
      let razdjeli = this.smjer[0].toString().split(",");
      if(this.xbrzina !== razdjeli[0]*-1 && this.ybrzina !== razdjeli[1]*-1 || this.rep[0] == null){
        this.xbrzina = parseInt(razdjeli[0]);
        this.ybrzina = parseInt(razdjeli[1]);
      }
      this.smjer.shift();
    }
  }

  this.brzina = function(bodovi){
    if(bodovi == 20)
      frameRate(18);
    else if (bodovi == 60)
      frameRate(22);
    else if (bodovi == 100)
      frameRate(25);
    else if (bodovi == 160)
      frameRate(28);
    else if (bodovi == 200)
      frameRate(35);
  }

  this.kraj = function(){
    this.x = 60;
    this.y = 60;
    this.ybrzina = 0;
    this.xbrzina = 1;
    this.bodovi = 0;
    this.rep = [];
    frameRate(15);
    $("#bod").text(this.bodovi);
    $("#rekordi").css({color: "rgb(153, 153, 153)"})
    boolRekord = false;
    if(!postavke)
      zvukKraj.play();

    postavke = false;
  }

  this.smrt = function(){
    for(let i = 0; i < this.rep.length; i++)
    {
      if(this.rep[i].x === this.x && this.rep[i].y === this.y)
        this.kraj();
    }
  }
}
