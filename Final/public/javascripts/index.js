function ready(){
    event.preventDefault();
    var listing={}
    var rawdata = JSON.parse(JSON.stringify($('form').serializeArray()));
    Object.keys(rawdata).forEach((data)=>{
        var name = rawdata[data].name;
        listing[name] = rawdata[data].value; 
    });

    console.log(listing);
    listing = JSON.stringify(listing);
    $.ajax({
        url:'/api/listings',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: listing,
        success:(json,status,request)=>{
            console.log(request.responseJSON);;
        },
        error: (request,status)=>{
            console.log("error");
        }
    })
}