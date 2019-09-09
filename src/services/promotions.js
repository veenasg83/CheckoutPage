let promotions = {
    "RRD4D32": function (orders, totalPrice) {
        var totalPayableAmount = totalPrice;
        if (totalPrice > 1000) {
            totalPayableAmount = totalPrice * (100 - 10) / 100;
        }
        return totalPayableAmount;
    },

    "44F4T11": function (orders, totalPrice) {
        var totalPayableAmount = totalPrice;
        if (totalPrice > 1500) {
            totalPayableAmount = totalPrice * (100 - 15) / 100;
        }
        return totalPayableAmount;
    },

    "FF9543D1": function (products) {
        var totalPayableAmount = 0;
        var orders = products;
        let docgen = orders.find(order => order.id === "docgen");
        if (docgen.quantity >= 10) {
            var docgenPrice = 8.99;
        }
        orders.forEach(function (order) {
            let price;
            if (order.id === "docgen")
                price = docgenPrice;
            else
                price = order.price;
            totalPayableAmount += price * order.quantity;

        })
        return totalPayableAmount;
    },

    "YYGWKJD": function (products) {
        var totalPayableAmount = 0;
        var orders = products;
        let wf = orders.find(order => order.id === "wf");

        if (wf.quantity >= 1) {
            var formPrice = 89.99;
        }
        orders.forEach(function (order) {
            let price;
            if (order.id === "form")
                price = formPrice;
            else
                price = order.price;

            totalPayableAmount += price * order.quantity;
        })
        return totalPayableAmount;
    }
};


export function getPromotions() {
    return promotions;
}

export function applyPromotions(promoCode, orders, totalPrice) {
    var totalPayableAmount = totalPrice;

    if (promotions[promoCode]) {
        totalPayableAmount = promotions[promoCode](orders, totalPrice);
        return totalPayableAmount;
    }
    else
        throw new Error('Invalid Promocode ', promoCode);


}