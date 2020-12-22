$(document).ready(function () {
  let getCart = () => {
    $.get("/api/user").then(function (data) {
      //Checks for cart Items
      if (!data.cartItems) {
        $("#tableDiv").text("You have no items in your cart.");
      }
      //Loop through Items
      for (i = 0; i < data.cartItems.length; i++) {
        let rowIndex = i + 1;
        let date = new Date(data.cartItems[i].createdAt).toDateString();
        let cartItem = `<tr>
            <th scope="row">${rowIndex}</th>
            <td>${data.cartItems[i].name}</td>
            <td><img class='listingThumbnail' src = '${data.cartItems[i].url}'/></td>
            <td>$${data.cartItems[i].price}</td>
            <td>${data.cartItems[i].quantity}</td>
            <td>${data.cartItems[i].category}</td>
            <td>${date}</td>
            <td><button type ="button" class = "edit-item btn btn-warning" data-id="${data.cartItems[i].id}">Edit</button></td>
            <td><button type="button" class="delete-item btn btn-danger" data-id="${data.cartItems[i].id}">Delete</button></td>
        </tr>`;

        $("#tableBody").append(cartItem);
      }
    });
  };

  //Delete Btn
  $(document).on("click", ".delete-item", function () {
    let id = $(this).data("id");

    $.ajax({
      method: "DELETE",
      url: "/api/cart-items/" + id,
    }).then(function () {
      // console.log("deleted");
      location.reload();
      getCart();
    });
  });
  getCart();
});
