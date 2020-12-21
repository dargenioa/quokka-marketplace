$(document).ready(function () {
  let listingId;
  let url = window.location.search;
  let previousImgURL;
  if (url.indexOf("?listing_id=") !== -1) {
    listingId = url.split("=")[1];
    console.log(listingId);

    $.get("/api/listings/" + listingId, function (data) {
      $("#input-item").val(data.name);
      $("#input-price").val(data.price);
      $("#input-quantity").val(data.quantity);
      $("#inputCategory").val(data.category);
      $("form").attr("action", `/api/edit-listings/${data.id}`);
      previousImgURL = data.url;
      console.log(data);
    });
  }

  $("#submit-edit").on("click", function () {
    location.reload();
    $.post(`/api/edit-listings/${listingId}`, { url: previousImgURL });
  });
});
