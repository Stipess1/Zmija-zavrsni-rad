function Rezolucija(){
  this.sirina;
  this.visina;

    this.provjeriRezoluciju = function(sirina, visina){
      if(sirina >= 1900 || sirina === 1700)
        this.sirina = 1900;
      else if (sirina >= 1600 || sirina === 1600)
        this.sirina = 1400;
      else if (sirina >= 1200 || sirina === 1200)
        this.sirina = 1100;
      else
        this.sirina = 900;



      if (visina >= 900 || visina === 800)
        this.visina = 800;
      else
        this.visina = 600;
    }

    this.postaviDemoRezoluciju = function(sirina, visina){
      if(sirina >= 1000)
        this.sirina = 800;

      if(visina >= 800){
        this.visina = 500;
      }
    }

}
