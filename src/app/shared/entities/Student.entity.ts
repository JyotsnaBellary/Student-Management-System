import { attendanceStatus, iattendanceStatus } from "./Attendence.entity";

export class Student{
    studentId:string;
    firstName:string;
    lastName:string;
    attendanceList: attendanceStatus[];
    attendancePercentage: string;
    section: string;
    Class: string;
    parentId: string;
    constructor(studentId:string,
        firstName:string,
        lastName:string,
        attendanceList: attendanceStatus[],
        attendancePercentage: string,
        section: string,
        Class: string,
        parentId: string)
        {
            this.studentId = studentId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.attendanceList = attendanceList;
            this.attendancePercentage = attendancePercentage;
            this.section = section;
            this.Class = Class;
            this.parentId = parentId;
        }
}