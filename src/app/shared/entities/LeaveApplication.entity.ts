export interface iLeave{
    date:Date;
    reason:string;
}

export class LeaveApplication{
    studentId:string;
    studentName:string;
    fromDate:Date;
    toDate!: Date;
    reason:string;
    status:string;
    
    constructor(studentId:string, studentName:string,fromDate:Date, reason:string,  status:string = "Applied", toDate?:Date){
        if(toDate){
        this.studentId = studentId;
        this.studentName = studentName;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status;
        }else{
            this.studentId = studentId;
            this.studentName = studentName;
            this.fromDate = fromDate;
            this.reason = reason;
            this.status = status;
        }
    }
}