$(document).ready(function () {
  $("#submit").on("click", function (event) {
    event.preventDefault();
    let formData = {
      name: $("input[name=name]").val().trim(),
      price: $("input[name=price]").val().trim(),
      quantity: $("input[name=quantity]").val().trim(),
      category: $("input[name=category]").val().trim(),
      
    };

    let userid = localStorage.getItem('userid')
    $.post(`/api/listings/new`, formData).then(function (data) {
      console.log(`Your data ${data} was Posted`);
    });
  });
});
