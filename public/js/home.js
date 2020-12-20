$(document).ready(function () {
    let index = 1;

    const generateListingTable = (data) => {
        $("#tableBody").empty();
        for (let i = 0; i < data.length; i++) {
            let currentUser = data[i];

            for (let j = 0; j < currentUser.Listings.length; j++) {
                let rowIndex = index++;
                let date = new Date(currentUser.Listings[j].createdAt).toDateString();
                let listing =

                    `<tr>
                <th scope="row">${rowIndex}</th>
                <td>${currentUser.Listings[j].name}</td>
                <td><img class='listingThumbnail' src = '${currentUser.Listings[j].url}'/></td>
                <td>$${currentUser.Listings[j].price}</td>
                <td>${currentUser.Listings[j].quantity}</td>
                <td>${currentUser.Listings[j].category}</td>
                <td>${date}</td>
                <td>${currentUser.username}</td>
                <td><button type="button" class="btn btn-success">Purchase</button></td>
            </tr>`

                $("#tableBody").append(listing);
            }
        };
    };

    const sortListings = (results) => {
        $("#tableBody").empty();

        for (let j = 0; j < results.length; j++) {
            let rowIndex = index++;
            let date = new Date(results[j].createdAt).toDateString();
            let listing =

                `<tr>
        <th scope="row">${rowIndex}</th>
        <td>${results[j].name}</td>
        <td><img class='listingThumbnail' src = '${results[j].url}'/></td>
        <td>$${results[j].price}</td>
        <td>${results[j].quantity}</td>
        <td>${results[j].category}</td>
        <td>${date}</td>
        <td>${results[j].username}</td>
        <td><button type="button" class="btn btn-success">Purchase</button></td>
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

});
