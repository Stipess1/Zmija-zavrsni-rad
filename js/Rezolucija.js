function Rezolucija()
{
  this.sirina;
  this.visina;

    this.provjeriRezoluciju = function(sirina, visina)
    {

      let tempSirina = (sirina - 10);
      this.sirina = tempSirina - (tempSirina % resetka);
      let tempVisina = (visina - 50);
      this.visina = tempVisina - (tempVisina % resetka);
    }

    this.postaviDemoRezoluciju = function(sirina, visina)
    {

      this.sirina = 600;
      this.visina = (visina - 320) - (visina % resetka);
      if(visina > 800)
      {
        this.visina = 500;
      }
    }

}
