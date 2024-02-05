$(document).ready(function () {
    $("#month_button").hover(function () {
         $("#panel").finish().slideToggle("slow");
    });

$("#panel").click(function () {
                    $("#month_button").text($(this).find('a:hover').text());
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