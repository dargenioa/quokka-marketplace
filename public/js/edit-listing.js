$(document).ready(function() {
    let listingId;
    let url = window.location.search;

    if (url.indexOf("?listing_id=") !== -1) {
        listingId = url.split("=")[1];
        console.log(listingId);

        $.get(("/api/listings/" + listingId), function(data) {
            console.log(data);

            $("#input-item").val(data.name);
            $("#input-price").val(data.price);
            $("#input-quantity").val(data.quantity);
            $("#inputCategory").val(data.category);

            console.log(data);
        });
    };

    $("#submit-edit").on("click", function () {
        listingId = url.split("=")[1];

        $.ajax({
          method: "PUT",
          url: "/api/listings/" + listingId
        }).then(function () {
          window.location.href = "/profile"
        });
      });
});