function Zmija(){

  this.x = 120;
  this.y = 120;
  this.xbrzina = 0;
  this.ybrzina = 0;
  this.bodovi = 0;
  this.rep = [];

  this.prikazi = function(){


    if(this.rep.length === this.bodovi){
      for(let i = 0; i < this.rep.length; i++){
        this.rep[i] = this.rep[i+1];
      }
      //print(this.rep.length);
    }
    this.rep[this.bodovi-1] = createVector(this.x, this.y);

    for(let i = 0; i < this.rep.length; i++){
      let pos = this.rep[i];
      fill(rep);
      rect(this.rep[i].x, this.rep[i].y, resetka, resetka);
    }

    this.x += this.xbrzina * resetka;
    this.y += this.ybrzina * resetka;
    //print(this.rep.length);

    fill(glava);
    rect(this.x, this.y, resetka, resetka);
  }

  this.rubovi = function(){
    if(!rubovi){
      if(this.x >= width)
        this.x = 0;
      else if(this.y >= height)
        this.y = 0;
      else if(this.x < 0)
        this.x = width;
      else if(this.y < 0)
        this.y = height;
    }
    else {
      if(this.x >= width || this.y >= height || this.y < 0 || this.x < 0){
        this.kraj();
      }
    }

  }

  this.kraj = function(){
    print(this.x + " " + this.y);
    this.x = 120;
    this.y = 120;
    this.ybrzina = 0;
    this.xbrzina = 0;
    this.bodovi = 0;
    this.rep = [];
    $("#bod").text(this.bodovi);
  }

  this.smrt = function(){
    for(let i = 0; i < this.rep.length; i++)
    {
      if(this.rep[i].x === this.x && this.rep[i].y === this.y)
        this.kraj();
    }
  }
}
