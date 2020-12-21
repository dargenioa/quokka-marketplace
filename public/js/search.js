$(document).ready(function () {
    const searchBar = document.getElementById("search-bar");
    let nameFilter = [];
    console.log(searchBar);

    $.ajax("/api/all-users", {
        type: "GET"
    }).then(function(results){
        console.log(results);
    });


    searchBar.addEventListener("keyup", function (event) {
        //console.log(event);
        console.log(event.target.value);
    })


})