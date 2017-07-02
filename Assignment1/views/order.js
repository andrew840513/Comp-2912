
function append(){
    var topping = $('#topping');
    if(topping.val() != "Select topping"){
        var htmlText = "<p class='topping'>"+$('#topping option[value='+topping.val()+']').text()+"</p>";
        var inputText = '<input type="hidden" name="topping" value="'+topping.val()+'">'
        $('#topping_added').append(htmlText);
        $('#topping_data').append(inputText);
    }
    $('#topping').val('default');
}

function validateForm(form) {
    if($('p.topping').length < 1){
        alert('at least one Topping');
        return false;
    }
    return true;
}

function conformation() {
    var url = "/success"
    var formData = $("form").serializeArray();
    $.post(url, formData).done((data)=> {
        if(data == "OK"){
            alert("Success! \n Your order will deliver within 30 minutes");
        }else{
            alert("Error please order again");
        }
        window.location.replace("/");
    })
}