$(document).ready(function () {
  //Popover
  var popOverSettings = {
    placement: "right",
    container: "body",
    html: true,
    delay: {
      hide: 1000,
    },
    selector: '[rel="popover"]', //Sepcify the selector here
    content: function () {
      return $("[data-content]").data("content");
    },
  };

  $("body").popover(popOverSettings);

  //Inital Table Generation

  const generateListingTable = (data) => {
    $("#tableBody").empty();
    for (let i = 0; i < data.length; i++) {
      let currentUser = data[i];

      for (let j = 0; j < currentUser.Listings.length; j++) {
        let date = new Date(currentUser.Listings[j].createdAt).toDateString();
        let button;

        if (currentUser.Listings[j].quantity < 1) {
          button = `<button type="button" data-id="${currentUser.Listings[j].id}" data-quantity="${currentUser.Listings[j].quantity}" 
          class="disabled btn btn-danger">Out of Stock</button>`;
        } else {
          button = `<button type="button" data-id="${currentUser.Listings[j].id}" data-quantity="${currentUser.Listings[j].quantity}" 
          class="btn btn-success" data-placement="right" data-toggle="popover" rel="popover" data-content="Item added to cart">Add to Cart</button>`;
        }
        let listing = `<tr>
                <td>${currentUser.Listings[j].name}</td>
                <td><img class='listingThumbnail' src = '${currentUser.Listings[j].url}'/></td>
                <td>$${currentUser.Listings[j].price}</td>
                <td>${currentUser.Listings[j].quantity}</td>
                <td>${currentUser.Listings[j].category}</td>
                <td>${date}</td>
                <td>${currentUser.username}</td>
                <td>${button}</td>
                </tr>`;

        $("#tableBody").append(listing);
      }
    }
  };

  //Sort Listing

  const sortListings = (results) => {
    $("#tableBody").empty();

    for (let j = 0; j < results.length; j++) {
      let date = new Date(results[j].createdAt).toDateString();
      let button;

      if (results[j].quantity === 0) {
        button = `<button type="button" data-id="${results[j].id}" data-quantity="${results[j].quantity}" class="disabled btn-danger">Out of Stock</button>`;
      } else {
        button = `<button type="button" data-id="${results[j].id}" data-quantity="${results[j].quantity}" class="btn btn-success">Add to Cart</button>`;
      }

      let listing = `<tr>
        <td>${results[j].name}</td>
        <td><img class='listingThumbnail' src = '${results[j].url}'/></td>
        <td>$${results[j].price}</td>
        <td>${results[j].quantity}</td>
        <td>${results[j].category}</td>
        <td>${date}</td>
        <td>${results[j].User.username}</td>
        <td>${button}</td>
    </tr>`;

      $("#tableBody").append(listing);
    }
  };

  //Gets all the user information

  $.ajax("/api/all-users", {
    type: "GET",
  }).then(generateListingTable);

  $(".dropdown-item").on("click", function () {
    let item = $(this).data("cat");
    console.log(item);

    $.ajax("/api/category/" + item, {
      type: "GET",
    }).then(sortListings);
  });

  $("#includeAll").on("click", function () {
    $.ajax("/api/all-users", {
      type: "GET",
    }).then(generateListingTable);
  });

  //Add to Cart Button

  $(document).on("click", ".btn-success", function () {
    let id = $(this).data("id");
    
    $(this).on("shown.bs.popover", function () {
      setTimeout(function () {
        $("[rel='popover']").popover("hide");
      }, 1000);
    });

    let getListingPromise = (id) => {
      return new Promise((resolve, reject) => {
        $.get("/api/listings/" + id).then((data) => {
          let cart = {
            name: data.name,
            price: data.price,
            category: data.category,
            url: data.url,
            ListingId: data.id,
          };

          resolve(cart);
        });
      });
    };

    getListingPromise(id).then((data) => {
      $.post("/api/cart-items/", data).then(() => {
        console.log("Success");
      });
    });
  });
});
