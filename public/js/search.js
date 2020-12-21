$(document).ready(function () {
    const searchBar = document.getElementById("search-bar");
    let grabRes = [];
    console.log(searchBar);

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(function(results){
        //console.log(results);
        results.forEach(a => a.Listings.forEach(b => grabRes.push(b.name)));
        //console.log(grabRes); 
    });


    searchBar.addEventListener("keyup", function (event) {
        //console.log(event);
        //console.log(event.target.value);
        //console.log(grabRes);

        const searchProduct = event.target.value.toLowerCase();
        const filteredName = grabRes.filter((item) => {
            return item.toLowerCase().includes(searchProduct);
        });

        console.log(filteredName);
    });


});