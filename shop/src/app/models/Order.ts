import { Product } from './product'; 

export class Order {
    _id: string;
    products: OrderProduct[];
    date: Date;
    totalPrice: number;

    constructor(_id: string, products: OrderProduct[], date: Date, totalPrice: number) {
        this.products = products;
        this.date = date;
        this._id = _id;
        this.totalPrice = totalPrice;
    }

    formatDate(): string {
        var temp = new Date(this.date);
        var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var formatted =  temp.getDate() + " " + monthShort[temp.getMonth()] + " " + temp.getFullYear();
        return formatted;
    }
}

export class OrderProduct {
    product: Product;
    amount: number;

    constructor(product: Product, amount: number) {
        this.product = product;
        this.amount = amount;
    }
}   