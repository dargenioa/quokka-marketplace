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
        
            console.log(data);
        });
    };
});