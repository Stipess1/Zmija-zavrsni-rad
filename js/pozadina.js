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
// (rep i glava) oboji glavu i rep (RGB)
let rep       = [255,255,255];
let glava     = [255,255,255];
let ihrana     = [255,0,255];
let pozadina;
function setup(){
  if(postavke)
  {
    frameRate(15);
    pozadina = createCanvas(600,500);
    pozadina.parent("pozadina");
    hrana = new Hrana();
    zmija = new Zmija();
    zmija.xbrzina = 1;
    $("#bodovi").toggle();
    $("#rekordi").toggle();
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
    zmija.prikazi();
    skreni();
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

function skreni(){
  if(zmija.x === 450 && zmija.y === 120){
    zmija.xbrzina = 0;
    zmija.ybrzina = 1;
  }
  else if(zmija.x === 450 && zmija.y === 350){
    zmija.xbrzina = -1
    zmija.ybrzina = 0;
  }
  else if(zmija.x === 120 && zmija.y === 350){
    zmija.xbrzina = 0;
    zmija.ybrzina = -1;
  }
  else if(zmija.x === 120 && zmija.y === 120)
  {
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
      $("#postavke").toggle();
      $("#bodovi").toggle();
      $("#rekordi").toggle();
    }
    else {
      clear();
      pozadina = createCanvas(600,500);
      pozadina.parent("pozadina");
      zmija.x = 120;
      zmija.y = 120;
      zmija.ybrzina = 0;
      zmija.xbrzina = 1;
      zmija.bodovi = 0;
      zmija.rep = [];
      postavke = true;
      $("#postavke").toggle();
      $("#bodovi").toggle();
      $("#rekordi").toggle();
    }
    break;
  }
}
