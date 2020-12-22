$(document).ready(function () {
  $.get("/api/user").then(function (data) {
    //Checks for cart Items
    if (!data.cartItems.length) {
      $("#tableDiv").text("You have no items in your cart.");
    }
    console.log(data);

    let purchasedPromise = () => {
      return new Promise((resolve, reject) => {
        for (let i = 0; data.cartItems.length; i++) {
          let cartItem = data.cartItems[i];
          if (cartItem.purchased) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    };

    purchasedPromise()
      .then((purchasedItem) => {
        if (purchasedItem) {
          let purchasedHeader = `<h1>Purchased</h1>
        <div class="container">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col"></th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>

              <tbody id="purchaseTBody"></tbody>
            </table>
          </div>
        </div>`;
          $("#tableHead").append(purchasedHeader);
        }
      })
      .then(() => {
        let cartIndex = 0;
        let purchaseIndex = 0;

        for (i = 0; i < data.cartItems.length; i++) {
          if (data.cartItems[i].purchased) {
            purchaseIndex++;
            let date = new Date(data.cartItems[i].createdAt).toDateString();
            let cartItem = `<tr>
            <th scope="row">${purchaseIndex}</th>
            <td>${data.cartItems[i].name}</td>
            <td><img class='listingThumbnail' src = '${data.cartItems[i].url}'/></td>
            <td>$${data.cartItems[i].price}</td>
            <td>${data.cartItems[i].category}</td>
            <td>${date}</td>
            
            <td><button type="button" class="delete-item btn btn-danger" data-id="${data.cartItems[i].id}"
            data-listing="${data.cartItems[i].ListingId}" data-quantity="${data.cartItems[i].ListingQuantity}">Delete</button></td>
        </tr>`;

            $("#purchaseTBody").append(cartItem);
          } else {
            cartIndex++;
            let date = new Date(data.cartItems[i].createdAt).toDateString();
            let cartItem = `<tr>
            <th scope="row">${cartIndex}</th>
            <td>${data.cartItems[i].name}</td>
            <td><img class='listingThumbnail' src = '${data.cartItems[i].url}'/></td>
            <td>$${data.cartItems[i].price}</td>
            <td>${data.cartItems[i].category}</td>
            <td>${date}</td>     
            <td><button type ="button" class = "buy-item btn btn-warning" data-id="${data.cartItems[i].id}" data-listing="${data.cartItems[i].ListingId}" data-quantity="${data.cartItems[i].ListingQuantity}">Buy</button></td>
            <td><button type="button" class="delete-item btn btn-danger" data-id="${data.cartItems[i].id}"
            data-listing="${data.cartItems[i].ListingId}" data-quantity="${data.cartItems[i].ListingQuantity}">Delete</button></td>
        </tr>`;

            $("#tableBody").append(cartItem);
          }
        }
      });
  });
});

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

//Buy Button
$(document).on("click", ".buy-item", function () {
  $(this).text("Purchased!");
  $(this).addClass("disabled");
  $(this).addClass("btn-success").removeClass("btn-warning");

  let idListing = $(this).data("listing");
  let id = $(this).data("id");
  $.ajax("/api/cart-items/" + id, {
    type: "PUT",
    data: {
      purchased: true,
    },
  }).then((res) => {
    console.log(res);
  });

  let listingQuantity;
  $.get("/api/listings/" + idListing, function (data) {
    listingQuantity = data.quantity;
  }).then(() => {
    listingQuantity--;
    $.ajax("/api/listings/" + idListing, {
      type: "PUT",
      data: {
        quantity: listingQuantity,
      },
    }).then(
      setTimeout(() => {
        alert("Thank you for your purchase!");
        window.location.href = "/cart";
      }, 1000)
    );
  });
});
