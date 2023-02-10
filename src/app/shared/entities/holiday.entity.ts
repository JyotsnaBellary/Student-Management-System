export interface IHoliday{
    date: string;
    day: string;
    holiday: string;
}

export class Holiday{
    date: string;
    day: string;
    holiday: string;
    constructor(date: string,
        day: string,
        holiday: string){
            this.date = date;
            this.day = day;
            this.holiday = holiday;
        }
}