export interface IListTransaction {
    transactions: ITransaction[], count: number
}

export interface ITransaction {
    stockId: string;

    type: TransactionTypeEnum;

    quantity: number;

    price: number;

    tax: number;

    date: Date;
}

export enum TransactionTypeEnum {
    sale = 'sale',
    buy = 'buy',
}
export enum TransactionTypeDisplayEnum {
    sale = 'VENDA',
    buy = 'COMPRA',
}