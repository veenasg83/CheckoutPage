import React, { Component } from 'react';
import { getProducts } from '../services/products';
import { applyPromotions } from '../services/promotions';
import '../styles/checkout.scss';

class Checkout extends Component {
    state = {
        products: [],
        totalPrice: 0,
        promoCode: "",
        applyPromoCode: false
    };

    componentDidMount = () => {
        let products = getProducts();
        this.setState({
            products: products
        });
    }

    onChangeQuantity = (product, e) => {
        let allPrice = 0;
        let exactPrice;
        const products = this.state.products.slice();
        products.forEach(function (p) {
            if (p.id === product.id) {
                p.subTotalPrice = product.price * e.currentTarget.value;
                p.quantity = e.currentTarget.value;

            }
            allPrice += p.subTotalPrice;
            exactPrice = allPrice.toFixed(2);

        })
        this.setState({ products, totalPrice: exactPrice });
    }

    onChangePromotion = (e) => {
        this.setState({
            promoCode: e.currentTarget.value
        })
    }

    onClickApply = () => {
        const { promoCode, applyPromoCode, products, totalPrice } = this.state;
        let applyCode = applyPromoCode;
        if (applyCode) {
            alert("Only one promotioncode can be applied at a time");
            return;
        }
        if (promoCode) {
            try {
                let finalPrice = applyPromotions(promoCode, products, totalPrice);
                applyCode = true;
                this.setState({ totalPrice: finalPrice, applyPromoCode: applyCode });
            }
            catch (e) {
                alert("The promocode is not valid");
            }
        }
    }

    render() {
        const { products, totalPrice } = this.state;
        return (
            <div className="wrapper" data-test="component-checkout">
                <h1> Checkout </h1>
                <div className="card products">
                    <h2>Orders </h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Unit price(AUD)</th>
                                <th>Quantity</th>
                                <th>Total(AUD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <div className="productQuantity">
                                            <input
                                                name="quantity"
                                                type="number"
                                                className="input"
                                                min="0"
                                                placeholder="0"
                                                value={product.quantity}
                                                onChange={(e) => this.onChangeQuantity(product, e)}
                                                data-test={product.id}
                                            />
                                        </div>
                                    </td>
                                    <td data-test={product.name}>${product.subTotalPrice.toFixed(2)}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="promotion">
                    <h2>Promotion</h2>
                    <div className="promotionContent"  >
                        <input
                            type="text"
                            name="promocode"
                            className="promoCode"
                            placeholder="Enter the promotion code"
                            onChange={this.onChangePromotion}
                            data-test="promoCode-input"
                        />
                        <button type="button" data-test="apply-button" className="btn btn-primary" onClick={this.onClickApply}>Apply</button>
                    </div>
                    <div className="totalPrice" data-test="amount-display">
                        <h3>TotalPrice:
                        ${totalPrice}
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;