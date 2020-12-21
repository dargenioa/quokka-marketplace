$(document).ready(function () {
    const searchBar = document.getElementById("search-bar");
    let grabRes = [];
    let grabImgUrl = [];
    let grabPrice = [];
    let grabQuantity = [];
    let grabCategory = [];
    let grabDate = [];
    let grabUser = [];
    console.log(searchBar);

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(function(results){
        console.log(results[1].Listings[0].url);
        results.forEach(a => grabRes.push(a.Listings));
        console.log
        // results.forEach(a => a.Listings.forEach(b => grabPrice.push(b.price)));
        // results.forEach(a => a.Listings.forEach(b => grabImgUrl.push(b.url)));
        // results.forEach(a => a.Listings.forEach(b => grabQuantity.push(b.quantity)));
        // results.forEach(a => a.Listings.forEach(b => grabCategory.push(b.category)));
        // results.forEach(a => a.Listings.forEach(b => grabDate.push(b.date)));
        // results.forEach(a => grabUser.push(a.username));
        //console.log(grabRes); 
        displaySearch()
    });


    searchBar.addEventListener("keyup", function (event) {
        //console.log(event);
        //console.log(event.target.value);
        //console.log(grabRes);

        const searchProduct = event.target.value.toLowerCase();
        const filteredName = grabName.filter((item) => {
            return item.toLowerCase().includes(searchProduct);
        });

        console.log(filteredName);

        //displayTable(filteredName,grabPrice, grabImgUrl, grabQuantity, grabCategory, grabDate, grabUser);
    });


    // function displayTable(tableName, tableUrl, tablePrice, tableQuantity, tableCategory, tableDate, tableUser){
    //     $("#search-table").empty();
    //     let date = new Date(tableDate).toDateString();
    //     const htmlTable = 
    //          `<tr>
    //         <td>${tableName}</td>
    //         <td><img class='listingThumbnail' src = '${tableUrl}'/></td>
    //         <td>$${tablePrice}</td>
    //         <td>${tableQuantity}</td>
    //         <td>${tableCategory}</td>
    //         <td>${date}</td>
    //         <td>${tableUser}</td>
    //         <td><button type="button" class="btn btn-success">Purchase</button></td>
    //     </tr>`

    //     $("#search-table").append(htmlTable);
    // }
});