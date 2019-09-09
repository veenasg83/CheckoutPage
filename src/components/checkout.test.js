import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Checkout from './checkout';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a shallowwrapper for the App component.
 * @param {object} props - Component props specific for setup
 * @param {any} state - intital state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Checkout {...props} />)
    if (state) wrapper.setState(state);
    return wrapper;
}
/**
 *Return Shallowwrapper containing nodes with the given data-test value.
 * @param {Shallowwrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
    const wrapper = setup();
    const checkoutComponent = findByTestAttr(wrapper, 'component-checkout');
    expect(checkoutComponent.length).toBe(1);
});
it('renders apply button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'apply-button');
    expect(button.length).toBe(1);
});

it('renders total payable amount', () => {
    const wrapper = setup();
    const amount = findByTestAttr(wrapper, 'amount-display');
    expect(amount.length).toBe(1);
});

it('totalPrice starts at 0', () => {
    const wrapper = setup();
    const initialPriceState = wrapper.state('totalPrice');
    expect(initialPriceState).toBe(0);
});

it('it should update the work flow product price according to  the workflow quantity', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'wf');

    input.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 2
        }
    });
    wrapper.update();
    expect(findByTestAttr(wrapper, 'wf').props().value).toBe(2);
    const initialPriceState = wrapper.state('totalPrice');
    expect(initialPriceState).toContain(399.98);
    const totalValue = findByTestAttr(wrapper, 'Workflow');
    expect(totalValue.text()).toContain(399.98);

});

it('it should update the document product price according to  the document quantity', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'docgen');
    input.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 4
        }
    });
    wrapper.update();
    expect(findByTestAttr(wrapper, 'docgen').props().value).toBe(4);
    const totalValue = findByTestAttr(wrapper, 'Document Generation');
    expect(totalValue.text()).toContain(39.96);

});

it('it should update the form product price according to  the form quantity', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'form');
    input.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 5
        }
    });
    wrapper.update();
    expect(findByTestAttr(wrapper, 'form').props().value).toBe(5);
    const totalValue = findByTestAttr(wrapper, 'Form');
    expect(totalValue.text()).toContain(499.95);

});

it('it should update the total price according to  the product quantity inputs', () => {
    const wrapper = setup();
    const inputwf = findByTestAttr(wrapper, 'wf');
    inputwf.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 2
        }
    });
    const inputdg = findByTestAttr(wrapper, 'docgen');
    inputdg.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 4
        }
    });
    const inputform = findByTestAttr(wrapper, 'form');
    inputform.simulate('change', {
        currentTarget: {
            name: 'quantity', value: 5
        }
    });
    wrapper.update();
    const initialPriceState = wrapper.state('totalPrice');
    expect(initialPriceState).toContain(939.89);

});

it('clicking the apply button applies the promotion RRD4D32 to total price', () => {
    const totalPrice = 1399;
    const promoCode = "RRD4D32";
    const products = [
        {
            "id": "wf",
            "name": "Workflow",
            "price": 199.99,
            "quantity": 4,
            "subTotalPrice": 0
        },
        {
            "id": "docgen",
            "name": "Document Generation",
            "price": 9.99,
            "quantity": 11,
            "subTotalPrice": 0
        },
        {
            "id": "form",
            "name": "Form",
            "price": 99.99,
            "quantity": 10,
            "subTotalPrice": 0
        }
    ];
    const wrapper = setup(null, { totalPrice, promoCode, products });

    //find button and click
    const button = findByTestAttr(wrapper, 'apply-button');
    button.simulate('click');
    wrapper.update();

    //find total price
    const totalValue = findByTestAttr(wrapper, 'amount-display');
    expect(totalValue.text()).toContain(1259.1);
});

it('clicking the apply button applies the promotion 44F4T11 to total price', () => {
    const totalPrice = 1600;
    const promoCode = "44F4T11";
    const products = [
        {
            "id": "wf",
            "name": "Workflow",
            "price": 199.99,
            "quantity": 4,
            "subTotalPrice": 0
        },
        {
            "id": "docgen",
            "name": "Document Generation",
            "price": 9.99,
            "quantity": 11,
            "subTotalPrice": 0
        },
        {
            "id": "form",
            "name": "Form",
            "price": 99.99,
            "quantity": 10,
            "subTotalPrice": 0
        }
    ];
    const wrapper = setup(null, { totalPrice, promoCode, products });

    //find button and click
    const button = findByTestAttr(wrapper, 'apply-button');
    button.simulate('click');
    wrapper.update();

    //find total price
    const totalValue = findByTestAttr(wrapper, 'amount-display');
    expect(totalValue.text()).toContain(1360);
});

it('clicking the apply button applies the promotion FF9543D1 to total price', () => {
    const totalPrice = 1800;
    const promoCode = "FF9543D1";
    const products = [
        {
            "id": "wf",
            "name": "Workflow",
            "price": 199.99,
            "quantity": 4,
            "subTotalPrice": 0
        },
        {
            "id": "docgen",
            "name": "Document Generation",
            "price": 9.99,
            "quantity": 11,
            "subTotalPrice": 0
        },
        {
            "id": "form",
            "name": "Form",
            "price": 99.99,
            "quantity": 10,
            "subTotalPrice": 0
        }
    ];
    const wrapper = setup(null, { totalPrice, promoCode, products });

    //find button and click
    const button = findByTestAttr(wrapper, 'apply-button');
    button.simulate('click');
    wrapper.update();

    //find total price
    const totalValue = findByTestAttr(wrapper, 'amount-display');
    expect(totalValue.text()).toContain(1898.75);
});

it('clicking the apply button applies the promotion YYGWKJD to total price', () => {
    const totalPrice = 1800;
    const promoCode = "YYGWKJD";
    const products = [
        {
            "id": "wf",
            "name": "Workflow",
            "price": 199.99,
            "quantity": 4,
            "subTotalPrice": 0
        },
        {
            "id": "docgen",
            "name": "Document Generation",
            "price": 9.99,
            "quantity": 11,
            "subTotalPrice": 0
        },
        {
            "id": "form",
            "name": "Form",
            "price": 99.99,
            "quantity": 10,
            "subTotalPrice": 0
        }
    ];
    const wrapper = setup(null, { totalPrice, promoCode, products });

    //find button and click
    const button = findByTestAttr(wrapper, 'apply-button');
    button.simulate('click');
    wrapper.update();

    //find total price
    const totalValue = findByTestAttr(wrapper, 'amount-display');
    expect(totalValue.text()).toContain(1809.75);
});

it('renders promocode input field', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'promoCode-input');
    expect(input.length).toBe(1);
});






