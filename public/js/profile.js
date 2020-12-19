$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let username = $("input[name=username]");
  let email = $("input[name=email]");
  let phoneNumber = $("input[name=phoneNumber]");
  let memberUsername = $(".member-username");
  $.get("/api/user").then(function (data) {
    console.log(data);
    username.val(data.username);
    email.val(data.email);
    phoneNumber.val(data.phoneNumber);
    memberUsername.text(data.username);
  });
  
});
