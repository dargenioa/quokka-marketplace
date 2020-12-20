$(document).ready(function () {
let index = 1;

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(function (data) {
        console.log("all users", data);
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
                    <td>${date}</td>
                    <td>${currentUser.username}</td>
                    <td><button type="button" class="btn btn-success">Purchase</button></td>
                </tr>`

                $("#tableBody").append(listing);
            }
        };
    });
});

