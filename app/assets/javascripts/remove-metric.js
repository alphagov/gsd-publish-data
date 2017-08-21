$(document).ready(function(){

  $(".remove-metric span").click(function(){
    $(this).parent().closest('div').hide();
    $(this).closest('input').prop("disabled", true);
  });

});