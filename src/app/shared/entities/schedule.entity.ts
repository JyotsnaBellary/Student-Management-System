export interface IStudentTimeTable{
    Class:string;
    section:string;
    schedule:IStudentschedule;
}
export interface ITeacherTimeTable{
    specialization:string;
    schedule:ITeacherschedule;
}
export interface ITeacherschedule{
    Monday: Idaily[];
    Tuesday: Idaily[];
    Wednesday: Idaily[];
    Thursday: Idaily[];
    Friday: Idaily[];
    
}
export interface Idaily{
    Class:string;
    section:string;
}
export interface IStudentschedule{
    Monday:String[];
    Tuesday: String[];
    Wednesday: String[];
    Thursday: String[];
    Friday: String[];
}
export class TimeTable{
    studentTimeTable?: IStudentTimeTable;
    teacherTimeTable?: ITeacherTimeTable;
    // Class!: string;
    // section!: string;
    // schedule!: Ischedule;
    // constructor(Class: string, section: string, schedule: Ischedule){
    //     this.Class = Class;
    //     this.section = section;
    //     this.schedule = schedule;
    // }
    constructor(studentTimeTable?: IStudentTimeTable,  teacherTimeTable?: ITeacherTimeTable){
        if(studentTimeTable){
        this.studentTimeTable = studentTimeTable;
        }
        if(teacherTimeTable){
            this.teacherTimeTable = teacherTimeTable
        }
    }
}