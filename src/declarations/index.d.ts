export interface User{
    id: number,
    name: string,
    password: string,
    admin:true,
    balance: string,
}

export interface Transactions{
    id: number,
    user_id: string,
    operation: string,
    amount: string,
    createdAt: string,
}
