$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  //Need to get data from the user's listing table and dynamically
  //create a display list.
  $.get("/api/user_listings").then(function(data) {
    //Code for appending to html ====>
    $(".listing-ul").append(data.list-name)

    //=============================================
  })

});
