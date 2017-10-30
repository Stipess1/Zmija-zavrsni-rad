let jacinaZvuka;
$(function(){
  $("#zvuk").val("10");
  $("#volume").text($("#zvuk").val());

  $(".btn").on("click", function(){
    // Gumb igraj
    if($(this).text() === "Igraj"){
      if(postavke){
        if($("#rubovi").is(":checked"))
          rubovi = true;
        else
          rubovi = false;

        if($("#hrana").is(":checked"))
          viseHrani = true;
        else
          viseHrani = false;
        pocniIgru();
        zvukGumb.play();
      }
      return false;
    }
    //-------------------
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
    switch ($("#glava option:selected").text()) {
      case "Bijela":
        glava = [255,255,255];
        break;
      case "Zelena":
        glava = [0,255,0];
      break
    }
    // Checkbox rubovi
    if($("#rubovi").is(":checked"))
      rubovi = true;
    else
      rubovi = false;
    // Checkbox polje
    if($("#polje").is(":checked"))
      resetke = true;
    else
      resetke = false;
    // Hrana checkbox...
    if($("#hrana").is(":checked"))
      viseHrani = true;
    else
      viseHrani = false;

    let broj;
    try{
      broj = int($("#brojHrane").val());
    } catch (err){
      alert("Upisi broj! default je sad: 4");
      broj = 4;
    }
    brojHrane = broj;
    // ----------------------
      tekst = true;
      vrijeme = frameCount + 30;
      textSize(32);
      zvukGumb.play();
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
  // -------------------
});
