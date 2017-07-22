var orderData = JSON.parse($.cookie('orderData'));
var price = orderData.price;
$(function ready(){
    $.getJSON("/api/pizza", (data)=>{
        var size = data.size;
        var crust = data.crust;
        var topping = data.topping;
        $('div#firstname').html(orderData.order.firstname);
        $('div#lastname').html(orderData.order.lastname);
        $('div#address').html(orderData.order.address);
        $('div#quantity').html(orderData.order.quantity);
        $('div#sizeText').html(size[orderData.order.size].text);
        $('div#sizePrice').html("$"+size[orderData.order.size].price);
        $('div#crustText').html(crust[orderData.order.crust].text);
        if(crust[orderData.order.crust].price >0){
            $('div#crustPrice').html("$"+crust[orderData.order.crust].price);
        }
        Object.keys(orderData.order.topping).forEach((data)=>{
            console.log(orderData.order.topping[data]);
            var ID = orderData.order.topping[data]
            $('#toppingText').append(topping[ID].text+'</br>');
            $('#toppingPrice').append('$'+topping[ID].price+'</br>');
        });
        $('#subTotal').html('$');
        $('#tax').html('$');
        $('#total').html('$'+price);
    });
});

function conformation() {
    var url = "/confirmation/success"
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