
const products = [
    {
        "id": "wf",
        "name": "Workflow",
        "price": 199.99,
        "quantity": 0,
        "subTotalPrice": 0
    },
    {
        "id": "docgen",
        "name": "Document Generation",
        "price": 9.99,
        "quantity": 0,
        "subTotalPrice": 0
    },
    {
        "id": "form",
        "name": "Form",
        "price": 99.99,
        "quantity": 0,
        "subTotalPrice": 0
    }
];

export function getProducts() {
    return products;
}