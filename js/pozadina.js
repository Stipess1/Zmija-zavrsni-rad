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
let zmije = [];
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

function preload(){
  zvukGumb    = loadSound("zvuk/Gumb.mp3");
  zvukHrana   = loadSound("zvuk/Hrana.mp3");
  zvukKraj    = loadSound("zvuk/Kraj.mp3");
  zvukRekord  = loadSound("zvuk/Rekord.mp3");

  zvukGumb.setVolume(0.1);
  zvukHrana.setVolume(0.1);
  zvukKraj.setVolume(0.1);
  zvukRekord.setVolume(0.1);
  if(lokalRekord === null)
    lokalRekord = 0;
}

function setup() {
  rezolucija      = new Rezolucija(windowWidth, windowHeight);
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

function draw() {
  if (postavke) {
    background(0);
    skreni();
    hrana.stvoriHranu();
    zmija.prikazi(true);
  } else {
    zmija.provjeriSmjer();
    background(0);
    prikaziHranu();
    if(multiplayer){
      zmija2.provjeriSmjer();
      noStroke();
      zmija2.prikazi(false);
      zmija2.rubovi();
      zmija2.smrt();
    }
    polje();
    noStroke();
    zmija.prikazi(true);
    zmija.rubovi();
    pojediHranu();
    zmija.smrt();
    dvaIgraca();
  }
}

function polje(){
  if(resetke){
    for(let i = 20; i < rezolucija.sirina; i+=20){
      stroke(50);
      line(i, 0, i, rezolucija.visina);
    }
    for(let i = 20; i < rezolucija.visina; i+=20){
      stroke(50);
      line(0, i, rezolucija.sirina, i);
    }
  }
}

function prikaziHranu(){
  if(viseHrani){
    for(let i = 0; i < Vhrane.length; i++)
      Vhrane[i].stvoriHranu();
  }
  else{
    hrana.stvoriHranu();
  }
}

function viHrane(){
  if(viseHrani){
    for(let i = 0; i < brojHrane; i++){
      Vhrane[i] = new Hrana();
      Vhrane[i].novaHrana();
      if(Vhrane[i].x === zmija.x && Vhrane[i].y === zmija.y)
        Vhrane[i].novaHrana();
    }
    let check = false;
    for(let i = 0; i < brojHrane-1; i++){
      for(let j = 1; j < brojHrane-1; j++){
        if(i != j){
          if(Vhrane[i].x === Vhrane[j].x && Vhrane[i].y === Vhrane[j].y){
            check = true;
            while(check){
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

function dvaIgraca(){
  if(multiplayer){
    if(zmija.x == zmija2.x && zmija.y == zmija2.y){
      if(zmija.rep.length > zmija2.rep.length){
        zmija2.kraj();
      } else if(zmija.rep.length == zmija2.rep.length){
        pocniDemo();
      } else{
        zmija.kraj();
      }
      return true;
    }
    for(let i = 0; i < zmija.rep.length; i++){
      if(zmija2.x == zmija.rep[i].x && zmija2.y == zmija.rep[i].y){
        zmija2.kraj();
        $drugiIgrac.text(0);
        zvukKraj.play();
      }
    }
    for(let i = 0; i < zmija2.rep.length; i++){
      if(zmija.x == zmija2.rep[i].x && zmija.y == zmija2.rep[i].y){
        zmija.kraj();
        $prviIgrac.text(0);
        zvukKraj.play();
      }
    }
  }
}

function pojediHranu(){
  if(viseHrani){
    for(let i = 0; i < Vhrane.length; i++){
      if(zmija.x === Vhrane[i].x && zmija.y === Vhrane[i].y){
        Vhrane[i].novaHrana();
        let check = false;
        for(let j = 0; j < Vhrane.length; j++){
          if(i != j){
            if(Vhrane[j].x == Vhrane[i].x && Vhrane[j].y == Vhrane[i].y){
              check = true;
              while(check){
                Vhrane[i].novaHrana();
                if(Vhrane[i].x != Vhrane[j].x && Vhrane[i].y != Vhrane[j].y){
                  check = false;
                }
              }
            }
          }
        }
        zmija.bodovi++;
        zvukHrana.play();
        if(!multiplayer){
          zmija.brzina(zmija.bodovi);
          $("#bod").text(this.bodovi);
          if (parseInt($("#bod").text()) > parseInt($("#rekord").text())){
            $("#rekord").text(this.bodovi);
            $("#rekordi").css({color: "rgb(154, 170, 26)"})
            localStorage.setItem("rekord", this.bodovi);
            if(!boolRekord){
              zvukRekord.play();
              boolRekord = true;
            }
          }
        } else {
          $prviIgrac.text(zmija.bodovi);
        }
      } else if (multiplayer) {
        for(let i = 0; i < Vhrane.length; i++){
          if(zmija2.x == Vhrane[i].x && zmija2.y == Vhrane[i].y){
          Vhrane[i].novaHrana();
          let check = false;
            for(let j = 0; j < Vhrane.length; j++){
              if(i != j){
                if(Vhrane[j].x == Vhrane[i].x && Vhrane[j].y == Vhrane[i].y){
                  check = true;
                  while(check){
                    Vhrane[i].novaHrana();
                    if(Vhrane[i].x != Vhrane[j].x && Vhrane[i].y != Vhrane[j].y){
                      check = false;
                    }
                  }
                }
              }
            }
            zmija2.bodovi++;
            zvukHrana.play();
            $drugiIgrac.text(zmija2.bodovi);
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
      zmija.brzina(zmija.bodovi);
      zvukHrana.play();
      if(!multiplayer){
        $("#bod").text(zmija.bodovi);
        if (parseInt($("#bod").text()) > parseInt($("#rekord").text())){
          $("#rekord").text(zmija.bodovi);
          $("#rekordi").css({color: "rgb(154, 170, 26)"})
          localStorage.setItem("rekord", zmija.bodovi);
          if(!boolRekord){
            zvukRekord.play();
            boolRekord = true;
          }
        }
      } else {
        $prviIgrac.text(zmija.bodovi);
      }
    } else if(multiplayer){
      if(zmija2.x == hrana.x && zmija2.y == hrana.y){
        hrana.novaHrana();
        zmija2.bodovi++;
        $drugiIgrac.text(zmija2.bodovi);
        zvukHrana.play();
      }
    }
  }
}

function pocniIgru(){
  clear();
  rezolucija.provjeriRezoluciju();
  pozadina = createCanvas(rezolucija.sirina, rezolucija.visina);
  pozadina.parent("pozadina");
  zmija.kraj();
  viHrane();
  if(!multiplayer)
    $("#rekord").text(localStorage.getItem("rekord"));

  $("#postavke").hide("slow");
  $togglePostavke.css({marginLeft: "202px"});

  if(multiplayer)
  {
    zmija2 = new Zmija();
    zmija2.x = 120;
    zmija2.y = 120;
    zmija2.xbrzina = 1;
    $prvi.show();
    $drugi.show();
  } else {
    $bodovi.show();
    $rekordi.show();
  }
}

function pocniDemo(){
  clear();
  frameRate(frame);
  pozadina = createCanvas(600, 500);
  pozadina.parent("pozadina");
  hrana = new Hrana();
  zmija = new Zmija();
  postaviDemo();
  Vhrane = [];
  postavke = true;

  $("#postavke").show("slow");
  $togglePostavke.css({ marginLeft: "310px" });
  $bodovi.hide();
  $rekordi.hide();
  $prvi.hide();
  $drugi.hide();
}

function postaviDemo() {
  zmija.xbrzina = 1;
  zmija.x = 20;
  zmija.y = 20;
}

function keyPressed() {
  switch (keyCode) {
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
