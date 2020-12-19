// $.ajax("/api/all-listings", {
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
    console.log("all users",data);
    // for (i = 0; i < data.length; i ++) {

    // }
})