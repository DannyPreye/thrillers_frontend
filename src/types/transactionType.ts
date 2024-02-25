export type TransactionType = {
    _id: string,
    amount: number,
    type: "debit" | "credit",
    description: string,
    date: string,
    transaction_fee: number;
    sender_or_reciever: {
        first_name: string,
        last_name: string;
    };
};
