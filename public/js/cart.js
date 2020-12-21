$(document).ready(function () {
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

    for (i = 0; i < data.cartItems.length; i++) {
      let rowIndex = index++;
      let date = new Date(data.Listings[i].createdAt).toDateString();
      let cartITem = `<tr>
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

      $("#tableBody").append(cart);
    }
  });
});
