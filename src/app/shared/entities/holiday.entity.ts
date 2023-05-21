export interface IHoliday{
    id: string;
    date: string;
    day: string;
    holiday: string;
}

export class Holiday{
    id: string;
    date: string;
    day: string;
    holiday: string;
    constructor(id: string, date: string,
        day: string,
        holiday: string){
            this.id = id;
            this.date = date;
            this.day = day;
            this.holiday = holiday;
        }
}