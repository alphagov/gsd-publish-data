$(document).ready(function(){

  $(".tick-cross-tick").click(function(){
      $(this).find("a").text("Add");
      $(this).closest("tr").toggleClass("metric-disabled");
      $(this).toggleClass("tick-cross-cross");
      $(this).toggleClass("tick-cross-tick");
  });

  $(".tick-cross-cross").click(function(){
      $(this).find("a").text("Remove");
      $(this).toggleClass("tick-cross-tick");
      $(this).toggleClass("tick-cross-cross");
  });

});