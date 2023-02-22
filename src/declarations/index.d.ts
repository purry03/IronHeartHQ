export interface User{
    id: number,
    name: string,
    password: string,
    admin:true,
    balance: string,
}

export interface Transaction{
    id: number,
    user_id: string,
    operation: string,
    amount: string,
    createdAt: string,
    timeAgo?: string,
}


export interface Payout{
    id: number,
    user_id: string,
    amount: string,
    createdAt: string,
    timeAgo?: string,
}
