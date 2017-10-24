$(function(){
  $("#btn").on("click", function(){
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

  });
  $("#togglePostavke").on("click",function(){
    $("#postavke").toggle("slow");
  });
});
