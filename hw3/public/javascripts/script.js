$(document).ready(function () {
    $("#month_button").hover(function () {
         $("#panel").finish().slideToggle("slow");
    });

$("#panel").click(function () {
    $("#month_button").text($(this).find('a:hover').text());
    
    //issue post to the server requesting the orders for a particular month
    $.post('/orders', function(response) {

        let plain_counter = 0;
        let cherry_counter = 0;
        let choco_counter = 0;
        
        
        for(var i = 0; i < response.data.length; i++) {
            let month_topping = response.data[i].topping;

            if(month_topping === 'plain') {
                plain_counter += response.data[i].quantity;
            }
            if(month_topping === 'cherry') {
                cherry_counter += response.data[i].quantity;
            }
            if(month_topping === 'chocolate') {
                choco_counter += response.data[i].quantity;
            }
        }
        
        //change text for each point in order_info
        $("#cherry_info").text(cherry_counter + " cherry");
        $("#choco_info").text(choco_counter + " chocolate");
        $("#plain_info").text(plain_counter + " plain");

    });
});

$("#order_button").click(function () {
    if($("#notes").val() == "vegan") {
        alert("This bakery doesn't offer vegan cheesecake. We're sorry!");
    }
    else {
        $("#order_form").hide().finish();
        $("#order_text").text("Thank you! Your order has been placed.");
        $("#order_text").append(" Order: " + $("#qty").val() + " " + $("input:checked").val() + ", Special Instructions:  " + $("#notes").val());
    }
});
});