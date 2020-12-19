// $.ajax("/api/all-user", {
//     type: "GET"
// }).then(function (data) {
//     //   res.json(data);
//     for (i = 0; i < data.length; i++) {
//         var rowIndex = i + 1;
//         var userListing =

//             `<tr>
//                   <th scope="row">${rowIndex}</th>
//                   <td>${data[i].name}</td>
//                   <td>${data[i].price}</td>
//                   <td>${data[i].quantity}</td>
//                   <td><button class = "edit-listing">Edit</button></td>
//               </tr>`

//         $("#tableBody").append(userListing);
//     };
// });

$.ajax("/api/all-users", {
    type: "GET"
}).then(function (data) {
    console.log("all users", data);
    for (i = 0; i < data.length; i++) {
        for (i = 0; data.Listings.length; i++) {
            var userListing =

            `<tr>
                <th scope="row">${rowIndex}</th>
                <td>${data.Listings[i].name}</td>
                <td><img class='listingThumbnail' src = '${data.Listings[i].url}'/></td>
                <td>$${data.Listings[i].price}</td>
                <td>${data.Listings[i].quantity}</td>
                <td>${data.Listings[i].createdAt}
                <td><button class = "edit-listing">Edit</button></td>
            </tr>`

            $("#tableBody").append(userListing);
        }
    };
});
