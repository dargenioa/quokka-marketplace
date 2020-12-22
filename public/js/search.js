$(document).ready(function () {
    const searchBar = document.getElementById("search-bar");
    let listingData = [];
    //console.log(searchBar);

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(function (results) {
        //console.log(results[1].Listings[0].url);
        // results.forEach(a => grabRes.push(a.Listings.name));
        //console.log(grabRes);
        listingData = [].concat(...[].concat(...results.map(result => result.Listings))); //use this to traverse the array of objects.

        console.log(listingData); //returns results.Listings.name all of them found in the db!
    });


    searchBar.addEventListener("keyup", function (event) {
        console.log(event);
        //console.log(event.target.value);
        //console.log(grabRes);

        if( event.which == 8 && ( document.activeElement.id == 'search-bar') ){   
            event.preventDefault();  
            return false;   
          } 
        const searchProduct = event.target.value.toLowerCase();
        console.log(searchProduct);
        const filteredName = listingData.filter((item) => {
            return item.name.toLowerCase().includes(searchProduct);
        });

        //console.log(filteredName);

        displayItems(filteredName);
    });

    function displayItems(searchedItems){
        $("#search-table").empty();
        const htmlTable = searchedItems.map((item) => {
            return `<tr>
            //         <td>${item.name}</td>
            //         <td><img class='listingThumbnail' src = '${item.url}'/></td>
            //         <td>$${item.price}</td>
            //         <td>${item.quantity}</td>
            //         <td>${item.category}</td>
            //     </tr>`
        });

        $("#search-table").append(htmlTable);
    }

    displayItems(listingData)
});