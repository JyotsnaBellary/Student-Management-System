export interface iLeave{
    fromDate:Date;
    toDate?: Date,
    reason:string;
}

export class LeaveApplication{
    userId:string;
    firstName:string;
    lastName:string;
    Class: string;
    section: string;
    fromDate : Date;
    toDate !: Date;
    reason : string;
    status : string;
    
    constructor(userId:string, firstName:string, lastName:string, Class:string, section:string, fromDate:Date, reason:string,  status:string = "Applied", toDate?:Date){
        if(toDate){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.Class = Class;
        this.section = section;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status;
        
        }else{
            this.userId = userId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.Class = Class;
            this.section = section;
            this.fromDate = fromDate;
            this.reason = reason;
            this.status = status;
        }
    }
}