interface IExpense{
    id:number;
    description:string;
    amount:number;
    createdAt:Date;
    user_id:number;
    userName:string;
    categoryId:number;
    categoryName:string;
}

export default IExpense;