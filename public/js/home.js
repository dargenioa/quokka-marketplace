$(document).ready(function () {

    const generateListingTable = (data) => {
        $("#tableBody").empty();
        for (let i = 0; i < data.length; i++) {
            let currentUser = data[i];

            for (let j = 0; j < currentUser.Listings.length; j++) {
                let date = new Date(currentUser.Listings[j].createdAt).toDateString();
                let button;

                if (currentUser.Listings[j].quantity === 0) {
                    button = `<button type="button" data-id="${currentUser.Listings[j].id}" data-quantity="${currentUser.Listings[j].quantity}" class="btn btn-success">Out of Stock</button>`
                } else {
                    button = `<button type="button" data-id="${currentUser.Listings[j].id}" data-quantity="${currentUser.Listings[j].quantity}" class="btn btn-success">Purchase</button>`
                }
                let listing =

                    `<tr>
                <td data-name:>${currentUser.Listings[j].name}</td>
                <td><img class='listingThumbnail' src = '${currentUser.Listings[j].url}'/></td>
                <td>$${currentUser.Listings[j].price}</td>
                <td>${currentUser.Listings[j].quantity}</td>
                <td>${currentUser.Listings[j].category}</td>
                <td>${date}</td>
                <td>${currentUser.username}</td>
                <td>${button}</td>
                </tr>`

                $("#tableBody").append(listing);
            }
        };
    };

    const sortListings = (results) => {
        $("#tableBody").empty();

        for (let j = 0; j < results.length; j++) {
            let date = new Date(results[j].createdAt).toDateString();
            let button;

            if (results[j].quantity === 0) {
                button = `<button type="button" data-id="${results[j].id}" data-quantity="${results[j].quantity}" class="btn btn-success">Out of Stock</button>`
            } else {
                button = `<button type="button" data-id="${results[j].id}" data-quantity="${results[j].quantity}" class="btn btn-success">Purchase</button>`
            }

            let listing =

                `<tr>
        <td>${results[j].name}</td>
        <td><img class='listingThumbnail' src = '${results[j].url}'/></td>
        <td>$${results[j].price}</td>
        <td>${results[j].quantity}</td>
        <td>${results[j].category}</td>
        <td>${date}</td>
        <td>${results[j].User.username}</td>
        <td>${button}</td>
    </tr>`

            $("#tableBody").append(listing);

        }

    };

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(generateListingTable);

    $(".cat").on("click", function () {
        let item = $(this).data("cat");
        console.log(item);

        $.ajax("/api/category/" + item, {
            type: "GET"
        }).then(sortListings);
    });

    $("#includeAll").on("click", function () {
        $.ajax("/api/all-users", {
            type: "GET"
        }).then(generateListingTable);
    });

    $(document).on("click", ".btn-success", function () {
        let id = $(this).data("id");
        let newQuantity = $(this).data("quantity");

        if (newQuantity === 0) {

            $(this).text("Out of Stock")
            window.location.reload();

        } else {

            newQuantity--

            $.ajax("/api/listings/" + id, {
                type: "PUT",
                data: {
                    quantity: newQuantity
                }
            }).then(function () {
                // window.location.reload();
                $.ajax("/api/add-to-cart/", {
                    type: "POST",
                    data: {
                        name: "name",
                        price: 1,
                        quantity: 1,
                        category: "req.body.category",
                        url: "req.body.url"
                    }
                }).then(function (results) {
                    console.log(results)
                });
            });
        };

    });
});
