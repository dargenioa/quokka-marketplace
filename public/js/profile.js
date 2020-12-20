$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let username = $("input[name=username]");
  let email = $("input[name=email]");
  let phoneNumber = $("input[name=phoneNumber]");
  let memberUsername = $(".member-username");
  let index = 1;

  $("#profileSaveBtn").on("click", function () {
    phoneNumber.val().trim();
    let data = {
      email: email.val().trim(),
      username: username.val().trim(),
      phoneNumber: phoneNumber.val().trim(),
    };
    $.ajax({
      method: "PUT",
      url: "/api/user",
      data: data,
    }).then(function () {
      location.reload();
    });
  });

  $.get("/api/user").then(function (data) {
    console.log(data);
    username.val(data.username);
    email.val(data.email);
    phoneNumber.val(data.phoneNumber);
    memberUsername.text(data.username);

    if (!data.Listings.length) {
      $("#tableDiv").text("You have no listings.");
    } else {
      // let tableHTML =
      //   `<table class="table table-striped table-hover">
      //           <thead>
      //               <tr>
      //               <th scope="col">#</th>
      //               <th scope="col">Name</th>
      //               <th scope="col">Price</th>
      //               <th scope="col">Quantity</th>
      //               <th scope="col"></th>
      //               </tr>
      //           </thead>
      //           <tbody id = "tableBody">
      //           </tbody>
      //       </table>`;
      // $("#tableDiv").append(tableHTML);
    }

    for (i = 0; i < data.Listings.length; i++) {
      let rowIndex = index++;
      let date = new Date(data.Listings[i].createdAt).toDateString();
      let userListing = `<tr>
            <th scope="row">${rowIndex}</th>
            <td>${data.Listings[i].name}</td>
            <td><img class='listingThumbnail' src = '${data.Listings[i].url}'/></td>
            <td>$${data.Listings[i].price}</td>
            <td>${data.Listings[i].quantity}</td>
            <td>${data.Listings[i].category}</td>
            <td>${date}</td>
            <td><button type ="button" class = "edit-listing btn btn-warning" data-id="${data.Listings[i].id}">Edit</button></td>
            <td><button type="button" class="delete-listing btn btn-danger" data-id="${data.Listings[i].id}">Delete</button></td>
        </tr>`;

      $("#tableBody").append(userListing);
    }
  });

  $(document).on("click", ".edit-listing", function () {
    let id = $(this).data("id");
    console.log(id);

    window.location.href = "/edit-listing?listing_id=" + id;
  });

  $(document).on("click", ".delete-listing", function () {
    let id = $(this).data("id");
    console.log(id);

    $.ajax({
      method: "DELETE",
      url: "/api/listings/" + id,
    }).then(function () {
      // console.log("deleted");
      window.location.href = "/profile";
    });
  });
});
