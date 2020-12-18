$("#listingBtn").on("click", function(event) {
    event.preventDefault();
    var listingName = $("#listingName");
    var listingPrice = $("#listingPrice");
    var listingQuantity = $("#listingQuantity");
    var listingCategory = $("#listingCategory");
    $.post("/api/listings", {
        name: listingName.val().trim(),
        price: listingPrice.val().trim(),
        quantity: listingQuantity.val().trim(),
        category: listingCategory.val().trim()
    }).then(function(){
        // window.location.replace("/members");
        console.log("hi");
    }).catch(function(error){
        console.log(error);
    })
});