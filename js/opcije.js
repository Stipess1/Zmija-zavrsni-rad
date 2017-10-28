$(function(){
  $(".btn").on("click", function(){

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

    if($("#rubovi").is(":checked"))
      rubovi = true;
    else
      rubovi = false;

    if($("#hrana").is(":checked"))
      viseHrani = true;
    else
      viseHrani = false;

      tekst = true;
      vrijeme = frameCount + 30;
      textSize(32);
      zvukGumb.play();
  });
  $("#togglePostavke").on("click",function(){
    $("#postavke").toggle("slow");
    if(!postavke)
      pocniDemo();
  });
});
