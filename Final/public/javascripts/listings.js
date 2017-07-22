$(function ready() {

    $.getJSON("/api/listings", function (data) {
        data.forEach(function (item) {
            var allowed = (item.rentalAllowed == "on")? "Yes": "No";
            $('#listings').
            append('<tr><td>' + item.name + '</td><td>' + item.type + '</td><td>' + item.address + '</td><td>' + "$"+item.price + '</td><td>' + allowed+ '</td><td>' + item.description + '</td></tr>');
        });
    });

});