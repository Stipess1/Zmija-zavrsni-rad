// (zmija i hrana) varijable koje se referiraju svojim objketima
let zmija;
let hrana;
// (rubovi) ako je false zmija se ne resetira kada uradi rub
let rubovi = false;
/*
  kada igrac stisne dvije tipke u istom trenutku
  zna se desit da zmija pojede samu sebe
*/
let fps;
let istiFps;
// -------------------------
// (resetka) dijelimo width i height i dobivamo broj stupaca i redaka
let resetka   = 10;
// (postavke) ako je true pokazi ekran sa opcijama
let postavke  = true;
// (rep, glava i hrana) oboji glavu, rep i hranu (RGB)
let rep        = [255,255,255];
let glava      = [255,255,255];
let ihrana     = [255,0,255];
// Postavljamo pozadinu u div sa id "pozadina"
let pozadina;
// Dohvacamo elemente
let $bodovi;
let $rekordi
let $togglePostavke
function setup(){
  $bodovi         = $("#bodovi");
  $rekordi        = $("#rekordi");
  $togglePostavke = $("#togglePostavke");
  if(postavke)
  {
    frameRate(15);
    pozadina = createCanvas(600,500);
    pozadina.parent("pozadina");
    hrana = new Hrana();
    zmija = new Zmija();
    hrana.stvoriHranu();
    postaviDemo();
    $bodovi.toggle();
    $rekordi.toggle();
  }
  else{
    frameRate(15);
    pozadina = createCanvas(600,500);
    pozadina.parent("pozadina");
    hrana = new Hrana();
    zmija = new Zmija();
    hrana.novaHrana();
  }
}

function draw(){
  if(postavke){
    background(0);
    skreni();
    zmija.prikazi();
    hrana.stvoriHranu();
    //print(zmija.x + " " + zmija.y);
  }else{
    noStroke();
    background(0);
    zmija.prikazi();
    zmija.rubovi();
    hrana.stvoriHranu();
    zmija.smrt();
    pojediHranu();
    fps = frameCount;
  }

  //stroke(255);
  //line(50,0,cols,height);
  //print(zmija.x + " " + zmija.y);
}

function postaviDemo(){
  zmija.xbrzina = 1;
  zmija.x = 50;
  zmija.y = 50;
}

function skreni(){
  if(zmija.x === width-50 && zmija.y === height-(height-50)){
    if(zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = 1;
  }
  else if(zmija.x === width-50 && zmija.y === height-50){
    if(zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = -1
    zmija.ybrzina = 0;
  }
  else if(zmija.x === width-(width-50) && zmija.y === height-50){
    if(zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = -1;
  }
  else if(zmija.x === width-(width-50) && zmija.y === height-(height-50))
  {
    if(zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 1;
    zmija.ybrzina = 0;

  }
}

function pojediHranu(){
  if(zmija.x === hrana.x && zmija.y === hrana.y)
  {
    hrana.novaHrana();
    zmija.bodovi++;
    $("#bod").text(zmija.bodovi);
    if(parseInt($("#bod").text()) > parseInt($("#rekord").text()))
      $("#rekord").text(zmija.bodovi);
  }
}

function keyPressed(){
  switch (keyCode) {
    case RIGHT_ARROW:
    if(zmija.rep[0] != null && zmija.xbrzina == -1)
      break;
        if(fps === istiFps)
          break;
      zmija.xbrzina = 1;
      zmija.ybrzina = 0;
      fps = istiFps;
      break;
    case LEFT_ARROW:
    if(zmija.rep[0] != null && zmija.xbrzina == 1)
      break;
      if(fps === istiFps)
        break;
      zmija.xbrzina = -1
      zmija.ybrzina = 0;
      fps = istiFps;
      break;
    case UP_ARROW:
    if(zmija.rep[0] != null && zmija.ybrzina == 1)
      break;
      if(fps === istiFps)
        break;
      zmija.xbrzina = 0;
      zmija.ybrzina = -1;
      fps = istiFps;
      break;
    case DOWN_ARROW:
    if(zmija.rep[0] != null && zmija.ybrzina == -1)
      break;
      if(fps === istiFps)
        break;
      zmija.xbrzina = 0;
      zmija.ybrzina = 1;
      fps = istiFps;
      break;
    case 65:
      zmija.bodovi++;
      break;
    case 70:
    if(postavke)
    {
      clear();
      pozadina = createCanvas(600,500);
      pozadina.parent("pozadina");
      postavke = false;
      zmija.kraj();
      hrana.novaHrana();
      $togglePostavke.css({marginLeft: "202px"});
      $bodovi.toggle();
      $rekordi.toggle();
    }
    else {
      clear();
      pozadina = createCanvas(600,500);
      pozadina.parent("pozadina");
      zmija.kraj();
      postavke = true;
      $togglePostavke.css({marginLeft: "310px"});
      $bodovi.toggle();
      $rekordi.toggle();
    }
    break;
  }
}
