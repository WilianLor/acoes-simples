export interface IListTransaction {
    transactions: ITransaction[], count: number
}

export interface ITransaction {
    stock: IStock;
    type: TransactionTypeEnum;
    quantity: number;
    price: number;
    tax: number;
    date: Date;
}

export interface IStock {
    id: string;
    stock: string;
    name: string;
    logo: string;
    type: string;
}

export enum TransactionTypeEnum {
    sale = 'sale',
    buy = 'buy',
}
export enum TransactionTypeDisplayEnum {
    sale = 'VENDA',
    buy = 'COMPRA',
}