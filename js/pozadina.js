// (zmija i hrana) varijable koje se referiraju svojim objketima
let zmija;
let zmija2;
let hrana;
let rezolucija;
let Vhrane = [];
// (rubovi) ako je false zmija se ne resetira kada uradi rub
let rubovi = false;
let viseHrani = false;
let multiplayer = false;
// Bonus bodovi
let bonus = false;
let bonusx;
let bonusy;
let timer;
let trenutnoVrijeme;
let bod = 0;
/*
  kada igrac stisne dvije tipke u istom trenutku
  zna se desit da zmija pojede samu sebe
*/
let frame = 15;
// Zvukovi
let zvukHrana;
let zvukKraj;
let zvukGumb;
let zvukRekord;
let boolRekord = false;
// -------------------------
// (resetka) dijelimo width i height i dobivamo broj stupaca i redaka
let resetka = 20;
// (postavke) ako je true pokazi ekran sa opcijama
let postavke = true;
// (rep, glava i hrana) oboji glavu, rep i hranu (RGB)
let rep = [255, 255, 255];
let glava = [255, 255, 255];
let ihrana = [255, 0, 255];
// Postavljamo pozadinu u div sa id "pozadina"
let pozadina;
let resetke = false;
let lokalRekord = localStorage.getItem("rekord");
let brojHrane = 4;
// Dohvacamo elemente
let $bodovi;
let $rekordi
let $togglePostavke

let BONUS_VRIJEME = 10000;

function preload()
{
  zvukGumb    = loadSound("zvuk/Gumb.mp3");
  zvukHrana   = loadSound("zvuk/Hrana.mp3");
  zvukKraj    = loadSound("zvuk/Kraj.mp3");
  zvukRekord  = loadSound("zvuk/Rekord.mp3");

  zvukGumb.setVolume(0.1);
  zvukHrana.setVolume(0.1);
  zvukKraj.setVolume(0.1);
  zvukRekord.setVolume(0.1);
}

function setup()
{
  $bodovi         = $("#bodovi");
  $rekordi        = $("#rekordi");
  $togglePostavke = $("#togglePostavke");
  $prvi           = $(".prvi");
  $drugi          = $(".drugi");
  $prviIgrac      = $(".prviIgrac");
  $drugiIgrac     = $(".drugiIgrac");
  noStroke();
  pocniDemo();
}

function draw()
{
  if (postavke)
  {
    background(0);
    skreni();
    hrana.stvoriHranu();
    zmija.prikazi(true);
  }
  else
  {
    trenutnoVrijeme = millis();
    timerIsteko();
    zmija.provjeriSmjer();
    background(0);
    polje();
    prikaziHranu();
    prikaziBonus();
    if(multiplayer)
    {
      zmija2.provjeriSmjer();
      zmija2.prikazi(false);
      zmija2.rubovi();
      zmija2.smrt();
    }
    zmija.prikazi(true);
    zmija.rubovi();
    pojediHranu();
    pojediBonus();
    zmija.smrt();
    dvaIgraca();
  }
}

function polje()
{
  if(resetke){
    for(let i = 20; i < rezolucija.sirina; i+=20)
    {
      stroke(50);
      line(i, 0, i, rezolucija.visina);
    }
    for(let i = 20; i < rezolucija.visina; i+=20)
    {
      stroke(50);
      line(0, i, rezolucija.sirina, i);
    }
  }
  noStroke();
}

function prikaziHranu()
{
  if(viseHrani){
    for(let i = 0; i < Vhrane.length; i++)
      Vhrane[i].stvoriHranu();
  }
  else{
    hrana.stvoriHranu();
  }
}

function prikaziBonus()
{
  if(bonus)
  {
    fill(0,255,0);
    rect(bonusx, bonusy, resetka, resetka);
  }
  else
  {
    bonusx = null;
    bonsuy = null;
  }
}

function pojediBonus()
{
  if(zmija.x == bonusx && zmija.y == bonusy)
  {
    bod+=5;
    dodajBod(bod);
    timer = 0;
    bonus = false;
    zvukHrana.play();
  }
}

function timerIsteko()
{
  if(trenutnoVrijeme > timer)
    bonus = false;
}

function viHrane()
{
  if(viseHrani)
  {
    for(let i = 0; i < brojHrane; i++)
    {
      Vhrane[i] = new Hrana();
      Vhrane[i].novaHrana();
      if(Vhrane[i].x === zmija.x && Vhrane[i].y === zmija.y)
        Vhrane[i].novaHrana();
    }
    let check = false;
    for(let i = 0; i < brojHrane-1; i++)
    {
      for(let j = 1; j < brojHrane-1; j++)
      {
        if(i != j)
        {
          if(Vhrane[i].x === Vhrane[j].x && Vhrane[i].y === Vhrane[j].y)
          {
            check = true;
            while(check)
            {
              Vhrane[i].novaHrana();
              if(Vhrane[i].x != Vhrane[j].x && Vhrane[i].y != Vhrane[j].y)
                check = false;
            }
          }
        }
      }
    }
  }
  else
    hrana.novaHrana();
}

function skreni()
{
  if (zmija.x === width - (resetka*2) && zmija.y === height - (height - resetka))
  {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = 1;
  }
  else if (zmija.x === width - (resetka*2) && zmija.y === height - (resetka*2))
  {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = -1
    zmija.ybrzina = 0;
  }
  else if (zmija.x === width - (width - resetka) && zmija.y === height - (resetka*2))
  {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = -1;
  }
  else if (zmija.x === width - (width - resetka) && zmija.y === height - (height - resetka))
  {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 1;
    zmija.ybrzina = 0;
  }
}

function dvaIgraca()
{
  if(multiplayer){
    for(let i = 0; i < zmija.rep.length; i++){
      if(zmija2.x == zmija.rep[i].x && zmija2.y == zmija.rep[i].y){
        multiplayerPocetak();
        let bod = parseInt($prviIgrac.text());
        bod+=1;
        $prviIgrac.text(bod);
        zvukKraj.play();
      }
    }
    for(let i = 0; i < zmija2.rep.length; i++){
      if(zmija.x == zmija2.rep[i].x && zmija.y == zmija2.rep[i].y){
        multiplayerPocetak();
        let bod = parseInt($drugiIgrac.text());
        bod+=1;
        $drugiIgrac.text(bod);
        zvukKraj.play();
      }
    }
  }
}

function pregledajPostojecuHranu(i)
{
  Vhrane[i].novaHrana();
  let check = false;
  for(let j = 0; j < Vhrane.length; j++)
  {
    if(i != j){
      if(Vhrane[j].x == Vhrane[i].x && Vhrane[j].y == Vhrane[i].y)
      {
        check = true;
        while(check)
        {
          Vhrane[i].novaHrana();
          if(Vhrane[i].x != Vhrane[j].x && Vhrane[i].y != Vhrane[j].y)
          {
            check = false;
          }
        }
      }
    }
  }
}

function dodajBod(bod)
{
  if(!multiplayer)
  {
    zmija.brzina(bod);
    $("#bod").text(bod);
    if (parseInt($("#bod").text()) > parseInt($("#rekord").text()))
    {
      $("#rekord").text(bod);
      $("#rekordi").css({color: "rgb(154, 170, 26)"})
      localStorage.setItem("rekord", bod);
      if(!boolRekord)
      {
        zvukRekord.play();
        boolRekord = true;
      }
    }
  }
}


function objektNaHrani(objektx, objekty)
{
  for(let i = 0; i < Vhrane.length; i++)
  {
    if(objektx == Vhrane[i].x && objekty == Vhrane[i].y)
    {
      return true;
    }
  }
  return false;
}

function dodajBonus()
{
  let check = true;
  while(check)
  {
    let stupac = rezolucija.sirina / resetka;
    let redak  = rezolucija.visina / resetka;

    let matStupac = floor(random(stupac)) * resetka;
    let matRedak  = floor(random(redak))  * resetka;

    if(!objektNaHrani(matStupac, matRedak))
    {
      check = false;
      bonus = true;
      bonusx = matStupac;
      bonusy = matRedak;
    }
  }

}

function pojediHranu()
{
  if(viseHrani)
  {
    for(let i = 0; i < Vhrane.length; i++)
    {
      if(zmija.x === Vhrane[i].x && zmija.y === Vhrane[i].y)
      {
        pregledajPostojecuHranu(i);

        zmija.bodovi++;
        bod++;
        if (bod % 15 == 0)
        {
          timer = trenutnoVrijeme + BONUS_VRIJEME;
          dodajBonus();
        }
        dodajBod(bod);
        zvukHrana.play();

      }
      else if (multiplayer)
      {
        for(let i = 0; i < Vhrane.length; i++)
        {
          if(zmija2.x == Vhrane[i].x && zmija2.y == Vhrane[i].y)
          {
            pregledajPostojecuHranu(i);
            zmija2.bodovi++;
            zvukHrana.play();
          }
        }
      }
    }
  }
  else{
    if (zmija.x === hrana.x && zmija.y === hrana.y)
    {
      hrana.novaHrana();
      zmija.bodovi++;
      bod++;
      if (bod == 10)
      {
        timer = trenutnoVrijeme + BONUS_VRIJEME;
        dodajBonus();
      }
      zmija.brzina(zmija.bodovi);
      zvukHrana.play();
      dodajBod(bod);
    }
    else if(multiplayer)
    {
      if(zmija2.x == hrana.x && zmija2.y == hrana.y)
      {
        hrana.novaHrana();
        zmija2.bodovi++;
        zvukHrana.play();
      }
    }
  }
}
function multiplayerPocetak()
{
  let postavix = (rezolucija.sirina / 2);
  let postaviy = (rezolucija.visina / 2);
  //
  zmija.rep = [];
  zmija.bodovi = 0;
  zmija.ybrzina = -1;
  zmija.xbrzina = 0;
  zmija.x = postavix + 60 - (postavix % 20);
  zmija.y = postaviy - (postaviy % 20);
  //
  zmija2.rep = [];
  zmija2.bodovi = 0;
  zmija2.ybrzina = 1;
  zmija2.xbrzina = 0;
  zmija2.x =  postavix - 60 - (postavix % 20);
  zmija2.y = postaviy - (postaviy % 20) ;

}

function pocniIgru()
{
  clear();
  rezolucija.provjeriRezoluciju(windowWidth, windowHeight);
  pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
  pozadina.parent("pozadina");
  zmija.kraj();
  viHrane();
  if(!multiplayer)
    $("#rekord").text(localStorage.getItem("rekord"));

  $("#postavke").hide("slow");
  $togglePostavke.css({marginLeft: "202px"});
  if(lokalRekord === null){
    $("#rekord").text(0);
  }

  if(multiplayer)
  {
    multiplayerPocetak();
    $prvi.show();
    $drugi.show();
  }
  else
  {
    $bodovi.show();
    $rekordi.show();
  }
}

function pocniDemo()
{
  rezolucija = new Rezolucija();
  rezolucija.postaviDemoRezoluciju(windowWidth, windowHeight);
  zmija2 = new Zmija();
  hrana  = new Hrana();
  zmija  = new Zmija();

  clear();
  frameRate(frame);
  pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
  pozadina.parent("pozadina");
  postaviDemo();
  Vhrane = [];
  postavke = true;

  $("#postavke").show("slow");
  $togglePostavke.css({ marginLeft: "310px" });
  $prviIgrac.text(0);
  $drugiIgrac.text(0);
  $bodovi.hide();
  $rekordi.hide();
  $prvi.hide();
  $drugi.hide();
}

function postaviDemo()
{
  zmija.xbrzina = 1;
  zmija.x = 20;
  zmija.y = 20;
}

function keyPressed()
{
  switch (keyCode)
  {
    case 68:
      zmija2.smjer.push([1,0]);
      break;
    case RIGHT_ARROW:
      if (postavke)
        break;
        zmija.smjer.push([1,0]);
      break;
    case 65:
      zmija2.smjer.push([-1,0]);
      break;
    case LEFT_ARROW:
      if (postavke)
        break;
        zmija.smjer.push([-1,0]);
      break;
    case 87:
      zmija2.smjer.push([0,-1]);
      break;
    case UP_ARROW:
      if (postavke)
        break;
        zmija.smjer.push([0,-1]);
      break;
    case 83:
      zmija2.smjer.push([0,1]);
      break;
    case DOWN_ARROW:
      if (postavke)
        break;
        zmija.smjer.push([0,1]);
      break;
    case 80:
      if (postavke)
        pocniIgru();
       else
        pocniDemo();
      break;
  }
}
