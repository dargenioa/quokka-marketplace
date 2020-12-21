$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    //local storage here?
  });

  //When we're ready, take away the on click function and just perform the request when loading the page:
  $("#addListing").on("click", function () {
    $.ajax("/api/listings", {
      type: "GET"
    }).then(function (data) {
      //   res.json(data);
      if (!data.length) {
        $("#tableDiv").text("You have no listings.")
      } else {
        let tableHTML =
          `<table class="table table-striped table-hover">    
                  <thead>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col"></th>
                      </tr>
                  </thead>
                  <tbody id = "tableBody">
      
                  </tbody>
              </table>`;

        $("#tableDiv").append(tableHTML);

      };

      for (i = 0; i < data.length; i++) {
        var rowIndex = i + 1;
        var userListing =

          `<tr>
                  <th scope="row">${rowIndex}</th>
                  <td>${data[i].name}</td>
                  <td>${data[i].price}</td>
                  <td>${data[i].quantity}</td>
                  <td><img src='${data[i].url}'/></td>
                  <td><button class = "edit-listing">Edit</button></td>
              </tr>`

        $("#tableBody").append(userListing);
      };
    });


    // function signUpUser(email, password) {
    //     $.post("/api/signup", {
    //       email: email,
    //       password: password
    //     })
    //       .then(function(data) {
    //         window.location.replace("/members");
    //         // If there's an error, handle it by throwing up a bootstrap alert
    //       })
    //       .catch(handleLoginErr);
    //   }
  })

  // $(".edit-listing").on("click", function() {
  //Allow editing and grab properties and update...
  // });

});
