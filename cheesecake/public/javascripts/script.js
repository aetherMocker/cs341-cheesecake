/**
 * script.js
 * 
 * all scripts for this proj
 * includes submitting orders and viewing order info onclick
 * 
 * Aether Mocker
 */

$(document).ready(function () {
    //scroll on panel that views all 12 months of order_info
    $("#month_button").hover(function () {
         $("#panel").finish().slideToggle("slow");
    });

    //old ver of viewing order_info (keep)
    /* $("#panel").click(function () {
        $("#month_button").text($(this).find('a:hover').text());
        let month_name = $("#month_button").text();
        console.log("Month name: " + month_name);
    });*/

    //when completing an order (clicking submit - order_button)
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

//when viewing order info 
function monthClick(month_name) {
    $("#month_button").text(month_name);

    console.log("Month name: " + month_name);
    
    //issue post to the server requesting the orders for a particular month
    $.post('/orders', { MONTH: month_name }, function(response) {
        console.log("inside post: " + month_name);
        let plain_counter = 0;
        let cherry_counter = 0;
        let choco_counter = 0;
        
        for(var i = 0; i < response.data.length; i++) {
            let month_topping = response.data[i].topping;
            console.log(i + " " + month_topping);

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
    console.log("after POST");
}
