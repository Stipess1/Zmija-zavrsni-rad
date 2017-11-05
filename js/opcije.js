let jacinaZvuka;

$(function(){
  $("#brojHrane").hide();
  $("#zvuk").val("10");
  $("#volume").text($("#zvuk").val());

  $(".btn").on("click", function(){
    // Gumb igraj
      pocniIgru();
      zvukGumb.play();
  });

  $("#rep").on("change", function(){
    switch ($("#rep option:selected").text()){
      case "Plava":
        rep = [0,0,255];
        break;
      case "Bijela":
        rep = [255,255,255];
        break;
      case "Crvena":
        rep = [255,0,0];
    }
  });

  $("#glava").on("change", function(){
    switch ($("#glava option:selected").text()) {
      case "Bijela":
        glava = [255,255,255];
        break;
      case "Zelena":
        glava = [0,255,0];
      break
    }
  });

  // Toggle postavke gumb
  $("#togglePostavke").on("click",function(){
    $("#postavke").toggle("slow");
    zvukGumb.play();
    if(!postavke)
      pocniDemo();
  });

  // Zvuk slider
  $("#zvuk").on("input", function(){
    $("#volume").text($("#zvuk").val());
    jacinaZvuka = $("#zvuk").val();
    if(jacinaZvuka > 40)
      $("#volume").css({color: "red"});
    else
      $("#volume").css({color: "black"});

    jacinaZvuka = jacinaZvuka / 100;
    zvukGumb.setVolume(jacinaZvuka);
    zvukHrana.setVolume(jacinaZvuka);
    zvukKraj.setVolume(jacinaZvuka);
    zvukRekord.setVolume(jacinaZvuka);
  });

  $("#zvuk").on("change", function(){
    zvukGumb.play();
  });
  $("#zvuk").on("click", function(){
    zvukGumb.play();
  });
  // -------------------

  // Gumb rubovi
  $("#rubovi").on("click", function(){
    if(rubovi){
      $("#rubovi").removeClass("ukljuceno").addClass("iskljuceno");
      rubovi = false;
    }
    else {
      $("#rubovi").removeClass("iskljuceno").addClass("ukljuceno");
      rubovi = true;
    }
    zvukGumb.play();
  });
// ----------------
// Gumb polje
  $("#polje").on("click", function(){
    if(resetke) {
      $("#polje").removeClass("ukljuceno").addClass("iskljuceno");
      resetke = false;
    }else {
      $("#polje").removeClass("iskljuceno").addClass("ukljuceno");
      resetke = true;
    }
    zvukGumb.play();
  });
// ---------------
// Hrana gumb
  $("#hrana").on("click", function(){
    if(viseHrani){
      $("#hrana").removeClass("ukljuceno").addClass("iskljuceno");
      $("#brojHrane").css({border: "2px solid red"});
      $("#brojHrane").hide("slow");
      viseHrani = false;
    } else {
      $("#hrana").removeClass("iskljuceno").addClass("ukljuceno");
      $("#brojHrane").show("slow");
      $("#brojHrane").css({border: "2px solid green"});
      viseHrani = true;
    }
    zvukGumb.play();
  });
// ---------------
  $("#brojHrane").on("focusout", function(){
    let broj;
    if(parseInt($("#brojHrane").val()) === null){
      alert("Upisi broj! default je 4");
      broj = 4;
    } else {
      broj = $("#brojHrane").val();
    }
    print(broj);
    brojHrane = broj;
  });
});
