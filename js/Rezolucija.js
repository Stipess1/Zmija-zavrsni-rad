function Rezolucija()
{
  this.sirina;
  this.visina;

    this.provjeriRezoluciju = function(sirina, visina)
    {

      let tempSirina = (sirina - 10);
      this.sirina = tempSirina - (tempSirina % 20);
      let tempVisina = (visina - 50);
      this.visina = tempVisina - (tempVisina % 20);
    }

    this.postaviDemoRezoluciju = function(sirina, visina)
    {

      this.sirina = 600;
      this.visina = (visina - 320) - (visina % 20);
      if(visina > 800)
      {
        this.visina = 500;
      }
    }

}
