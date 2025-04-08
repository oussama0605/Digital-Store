
paypal.Buttons({
    createOrder: function(data, actions) {
    return actions.order.create({
        purchase_units: [{
        amount: {
            value: '50.80', // السعر
            currency_code: 'USD'
        },
        description: 'شراء منتج'
        }]
    });
    },
    onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
        alert('تم الدفع بنجاح! ' + details.payer.name.given_name);
        // يمكنك إضافة إعادة توجيه أو تحديث قاعدة البيانات هنا
    });
    }
}).render('#paypal-button-container');
