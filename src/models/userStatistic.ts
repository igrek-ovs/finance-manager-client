interface IUserStatistic {
    userId:number;
    firstName:string;
    lastName:string;
    lastMonthExpenses: number;
    lastWeekExpenses:number;
    avgDayExpenses:number;
    totalExpenses:number;
    mostPopularCategory:string;
}

export default IUserStatistic;