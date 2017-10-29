// (zmija i hrana) varijable koje se referiraju svojim objketima
let zmija;
let hrana;
let rezolucija;
let Vhrane = [];
// (rubovi) ako je false zmija se ne resetira kada uradi rub
let rubovi = false;
let viseHrani = false;
/*
  kada igrac stisne dvije tipke u istom trenutku
  zna se desit da zmija pojede samu sebe
*/
let frame = 15;
let smjer = [];
// Crtanje teksta
let tekst = false;
let vrijeme;
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
// Dohvacamo elemente
let $bodovi;
let $rekordi
let $togglePostavke

function preload(){
  // zvukGumb    = loadSound("zvuk/Gumb.mp3");
  // zvukHrana   = loadSound("zvuk/Hrana.mp3");
  // zvukKraj    = loadSound("zvuk/Kraj.mp3");
  // zvukRekord  = loadSound("zvuk/Rekord.mp3");
  //
  // zvukGumb.setVolume(0.1);
  // zvukHrana.setVolume(0.1);
  // zvukKraj.setVolume(0.1);
  // zvukRekord.setVolume(0.1);
}

function setup() {
  rezolucija = new Rezolucija(windowWidth, windowHeight);
  $bodovi = $("#bodovi");
  $rekordi = $("#rekordi");
  $togglePostavke = $("#togglePostavke");
  noStroke();
  pocniDemo();
}

function draw() {
  if (postavke) {
    background(0);
    skreni();
    hrana.stvoriHranu();
    zmija.prikazi();
    if (tekst)
      pokaziTekst();
  } else {
    background(0);
    zmija.provjeriSmjer();
    zmija.rubovi();
    if(viseHrani){
      for(let i = 0; i < Vhrane.length; i++)
        Vhrane[i].stvoriHranu();
    }
    else{
      hrana.stvoriHranu();
    }
    zmija.prikazi();
    zmija.smrt();
    pojediHranu();
  }
}

function viHrane(){
  if(viseHrani){
    for(let i = 0; i < 4; i++){
      Vhrane[i] = new Hrana();
      Vhrane[i].novaHrana();
    }
  }
  else
    hrana.novaHrana();
}

function pokaziTekst() {
  fill(130, 69, 223);
  text("Spremljeno", (width / 2) - 70, height / 2);
  if (vrijeme > frameCount) {
    tekst = true;
  } else {
    tekst = false;
  }
}

function postaviDemo() {
  zmija.xbrzina = 1;
  zmija.x = 20;
  zmija.y = 20;
}
// width: 600, height: 500
function skreni() {
  if (zmija.x === width - 40 && zmija.y === height - (height - 20)) {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = 1;
  } else if (zmija.x === width - 40 && zmija.y === height - 40) {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = -1
    zmija.ybrzina = 0;
  } else if (zmija.x === width - (width - 20) && zmija.y === height - 40) {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 0;
    zmija.ybrzina = -1;
  } else if (zmija.x === width - (width - 20) && zmija.y === height - (height - 20)) {
    if (zmija.bodovi < 6)
      zmija.bodovi++;
    zmija.xbrzina = 1;
    zmija.ybrzina = 0;

  }
}

function pojediHranu() {
  if(viseHrani){
    for(let i = 0; i < Vhrane.length; i++){
      if(zmija.x === Vhrane[i].x && zmija.y === Vhrane[i].y){
        zmija.bodovi++;
        Vhrane[i].novaHrana();
        $("#bod").text(zmija.bodovi);
        zvukHrana.play();
        if (parseInt($("#bod").text()) > parseInt($("#rekord").text())){
          $("#rekord").text(zmija.bodovi);
          if(!boolRekord){
            zvukRekord.play();
            boolRekord = true;
          }
        }
      }
    }
  }
  else{
    if (zmija.x === hrana.x && zmija.y === hrana.y) {
      hrana.novaHrana();
      zmija.bodovi++;
      $("#bod").text(zmija.bodovi);
      zvukHrana.play();
      if (parseInt($("#bod").text()) > parseInt($("#rekord").text())){
        $("#rekord").text(zmija.bodovi);
        if(!boolRekord){
          zvukRekord.play();
          boolRekord = true;
        }
      }
    }
  }
}

function pocniIgru(){
  clear();
  rezolucija = new Rezolucija(windowWidth, windowHeight);
  rezolucija.provjeriRezoluciju();
  pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
  pozadina.parent("pozadina");
  viHrane();
  zmija.kraj();

  $("#postavke").hide("slow");
  $togglePostavke.css({marginLeft: "202px"});
  $bodovi.toggle();
  $rekordi.toggle();
}

function pocniDemo(){
  clear();
  frameRate(frame);
  resetka = 20;
  pozadina = createCanvas(600, 500);
  pozadina.parent("pozadina");
  hrana = new Hrana();
  zmija = new Zmija();
  postaviDemo();
  postavke = true;

  $("#postavke").show("slow");
  $togglePostavke.css({ marginLeft: "310px" });
  $bodovi.toggle();
  $rekordi.toggle();
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.xbrzina == -1)
        break;
        smjer.push([1,0]);
      break;
    case LEFT_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.xbrzina == 1)
        break;
        smjer.push([-1,0]);
      break;
    case UP_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.ybrzina == 1)
        break;
        smjer.push([0,-1]);
      break;
    case DOWN_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.ybrzina == -1)
        break;
        smjer.push([0,1]);
      break;
    case 65:
      if (postavke)
        break;
      zmija.bodovi++;
      break;
    case 70:
      if (postavke)
        pocniIgru();
       else
        pocniDemo();
      break;

  }
  return false;
}
