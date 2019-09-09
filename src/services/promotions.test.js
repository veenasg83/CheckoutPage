import { applyPromotions } from './promotions.js';

const orders = [
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

const ordersWith10Documents = [
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
        "quantity": 10,
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

const ordersWith1workFlow = [
    {
        "id": "wf",
        "name": "Workflow",
        "price": 199.99,
        "quantity": 1,
        "subTotalPrice": 0
    },
    {
        "id": "docgen",
        "name": "Document Generation",
        "price": 9.99,
        "quantity": 10,
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


describe("promotion", () => {

    it("apply promotion RRD4D32", () => {
        expect(applyPromotions("RRD4D32", orders, 1300)).toBe(1170)
    });

    it("apply promotion RRD4D32 with total price 1000, the total payable amount is 1000", () => {
        expect(applyPromotions("RRD4D32", orders, 1000)).toBe(1000)
    });

    it("apply promotion 44F4T11", () => {
        expect(applyPromotions("44F4T11", orders, 1800)).toBe(1530)
    });

    it("apply promotion 44F4T11 with totalprice 1500,the total payable amount is 1500", () => {
        expect(applyPromotions("44F4T11", orders, 1500)).toBe(1500)
    });

    it("apply promotion FF9543D1 with more than 10 documents", () => {

        expect(applyPromotions("FF9543D1", orders, 1800)).toBe(1898.75)
    });

    it("apply promotion FF9543D1, with 10 documents", () => {

        expect(applyPromotions("FF9543D1", ordersWith10Documents, 1800)).toBe(1889.76)
    });

    it("apply promotion YYGWKJD with more than 1 workflow product", () => {
        expect(applyPromotions("YYGWKJD", orders, 1800)).toBe(1809.75)
    });

    it("apply promotion YYGWKJD with 1 workflow product", () => {
        expect(applyPromotions("YYGWKJD", ordersWith1workFlow, 1800)).toBe(1199.79)
    });
});



