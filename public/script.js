function orderProduct(product_id) {
    $('#order_product').val(product_id)
    axios.post('/order/'+product_id, {"email":$("#email").val(), "password":$("#password").val()})
    .then(function (response) {
        // handle success
        //console.log(response);
        switch(response.data.error_text) {
            case "need_connection":
            case "incorrect_password":    
                $('#login-form').show()
                break;
            default:
                alert(response.data.error_text);        
        }
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

// Vanilla
document.addEventListener("DOMContentLoaded", function() {
    // code
    $('#login-form').hide()
  });
