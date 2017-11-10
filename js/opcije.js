let jacinaZvuka;

$(function(){
  $("#brojHrane").hide();
  $(".prvi").hide();
  $(".drugi").hide();
  $("#zvuk").val("10");
  $("#volume").text($("#zvuk").val());

  $(".btn").on("click", function(){
    // Gumb igraj
      pocniIgru();
      zvukGumb.play();
  });

  $("#rep").on("change", function(){
    rep = color($("#rep").val());
  });

  $("#glava").on("change", function(){
    glava = color($("#glava").val());
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
      $("#volume").css({color: "rgb(171, 54, 54)"});
    else
      $("#volume").css({color: "white"});

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
      $("#brojHrane").css({border: "2px solid rgb(135, 135, 135)"});
      $("#brojHrane").hide("slow");
      viseHrani = false;
    } else {
      $("#hrana").removeClass("iskljuceno").addClass("ukljuceno");
      $("#brojHrane").show("slow");
      $("#brojHrane").css({border: "2px solid rgb(185, 185, 185)"});
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
    brojHrane = broj;
  });

  $("#Pmultiplayer").on("click", function(){
    if(multiplayer){
      $("#Pmultiplayer").removeClass("ukljuceno").addClass("iskljuceno");
      multiplayer = false;
    } else {
      $("#Pmultiplayer").removeClass("iskljuceno").addClass("ukljuceno");
      multiplayer = true;
    }
    zvukGumb.play();
  });
});
