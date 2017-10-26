// (zmija i hrana) varijable koje se referiraju svojim objketima
let zmija;
let hrana;
let rezolucija;
// (rubovi) ako je false zmija se ne resetira kada uradi rub
let rubovi = false;
/*
  kada igrac stisne dvije tipke u istom trenutku
  zna se desit da zmija pojede samu sebe
*/
let fps;
let istiFps;
let frame = 15;
// Crtanje teksta
let tekst = false;
let vrijeme;
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
function setup() {
  rezolucija = new Rezolucija(windowWidth, windowHeight);
  $bodovi = $("#bodovi");
  $rekordi = $("#rekordi");
  $togglePostavke = $("#togglePostavke");
  noStroke();
  if (postavke) {
    pocniDemo();
  } else {
    frameRate(frame);
    rezolucija.provjeriRezoluciju();
    pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
    pozadina.parent("pozadina");
    hrana = new Hrana();
    zmija = new Zmija();
    hrana.novaHrana();
  }
}

function draw() {
  if (postavke) {
    background(0);
    skreni();
    zmija.prikazi();
    hrana.stvoriHranu();
    if (tekst)
      pokaziTekst();
    print(zmija.x + " " + zmija.y);
  } else {
    print(zmija.x + " " + zmija.y);
    background(0);
    zmija.prikazi();
    zmija.rubovi();
    hrana.stvoriHranu();
    zmija.smrt();
    pojediHranu();
    fps = frameCount;
  }
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
  if (zmija.x === hrana.x && zmija.y === hrana.y) {
    hrana.novaHrana();
    zmija.bodovi++;
    $("#bod").text(zmija.bodovi);
    if (parseInt($("#bod").text()) > parseInt($("#rekord").text()))
      $("#rekord").text(zmija.bodovi);
  }
}

function pocniIgru(){
  clear();
  rezolucija.provjeriRezoluciju();
  pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
  pozadina.parent("pozadina");
  hrana.novaHrana();
  postavke = false;
  zmija.kraj();
  $("#postavke").hide("slow");
  $togglePostavke.css({
    marginLeft: "202px"
  });
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
  $togglePostavke.css({
    marginLeft: "310px"
  });
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
      if (fps === istiFps)
        break;
      zmija.xbrzina = 1;
      zmija.ybrzina = 0;
      fps = istiFps;
      break;
    case LEFT_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.xbrzina == 1)
        break;
      if (fps === istiFps)
        break;
      zmija.xbrzina = -1
      zmija.ybrzina = 0;
      fps = istiFps;
      break;
    case UP_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.ybrzina == 1)
        break;
      if (fps === istiFps)
        break;
      zmija.xbrzina = 0;
      zmija.ybrzina = -1;
      fps = istiFps;
      break;
    case DOWN_ARROW:
      if (postavke)
        break;
      if (zmija.rep[0] != null && zmija.ybrzina == -1)
        break;
      if (fps === istiFps)
        break;
      zmija.xbrzina = 0;
      zmija.ybrzina = 1;
      fps = istiFps;
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
