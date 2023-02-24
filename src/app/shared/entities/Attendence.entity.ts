export interface iattendanceStatus{
    date: string;
    status: number;
}
export interface iStudentattendance{ //iStudents
    studentId:string;
    attendance:iattendanceStatus[];
}
export class Attendance{
    Class!:string;
    section!:string;
    students!:iStudentattendance[]; //istudents
    constructor(Class:string, section:string, students:iStudentattendance[]){
        this.Class = Class;
        this.section = section;
        this.students = students
    }
}
export class Studentattendance{ //Students
    studentId!:string;
    attendance!:attendanceStatus[];
    constructor(studentId:string, attendance:attendanceStatus[]){
        this.studentId = studentId;
        this.attendance = attendance;
    }
}
export class attendanceStatus{
    date!: Date;
    status!: number;
    constructor(date?: string,
        status?: number, attendance?:iattendanceStatus){
            if(attendance){
                this.date = new Date(attendance.date);
                this.status = attendance.status;
            }else if(date && status){
            this.date= new Date(date);
            this.status=status;
        }

        }
}