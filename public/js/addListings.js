$(document).ready(function () {
  //Get information from the form
  //see how informations is recieved
  let form = $("#inputForm");

  let imagesPreview = function (input, placeToInsertImagePreview) {
    if (input.file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $($.parseHTML("<img>"))
          .attr("src", event.target.result)
          .appendTo(placeToInsertImagePreview);
      };
      reader.readAsDataURL(input.file);
    }
  };

  // let postListing = function (formData) {
  //   let formData = {
  //     name: $("#name").val(),
  //     price: $("input[name=price]").val(),
  //     quantity: $("input[name=quantity]").val(),
  //     category: $("input[name=category]").val(),
  //     purchased: null,
  //     file: $("input[name=file]").val(),
  //   };

  //   $.post("/uploads", {
  //     formData,
  //   });
  // };



  $("#input-file").on("change", function () {
    imagesPreview(this, "div.preview-images");
  });
  // $("button").on("click", function (event) {
  //   event.preventDefault();
  // });
});
