function Rezolucija(sirina, visina){
  this.sirina = sirina;
  this.visina = visina;

    this.provjeriRezoluciju = function(){
      print(this.sirina);
      if(this.sirina >= 1900 || this.sirina === 1700)
        this.sirina = 1700;
      else if (this.sirina >= 1600 || this.sirina === 1600)
        this.sirina = 1400;
      else if (this.sirina >= 1200 || this.sirina === 1200)
        this.sirina = 1100;
      else
        this.sirina = 900;



      if (this.visina >= 900 || this.visina === 800)
        this.visina = 800;
      else
        this.visina = 600;


    }

}
