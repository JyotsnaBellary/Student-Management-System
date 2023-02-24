export class Teacher{
    teacherId:string;
    firstName:string;
    lastName:string;
    dept: string;
    specialization: string;
    Class: string;
    section: string;
    constructor(teacherId:string,
        firstName:string,
        lastName:string,
        dept: string,
        specialization: string,
        Class: string,
        section: string){
            this.teacherId = teacherId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.dept = dept;
            this.specialization = specialization;
            this.Class = Class;
            this.section = section;
        }
}