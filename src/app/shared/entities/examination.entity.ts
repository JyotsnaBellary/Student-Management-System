export interface Iday{
    day: string;
    date: string;
    subject: string;
}
export interface Iexamination{
    Class:string;
    schedule: Iday[];
}
export interface Iinvigilation{
    teacherId:string;
    Class:string;
    Section:string;
    schedule:Iday;
}
export class Examination{
    // Class: string;
    // schedule: Iday[];
    studentScedule?: Iexamination
    constructor(studentScedule?: Iexamination){
        if(studentScedule){
            this.studentScedule = studentScedule
        }
        
    }
}