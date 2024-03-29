export class Entity{
    public Id: string | any;
    public firstName: string | any;
    public lastName: string | any;
    studentDetails? : StudentDetails;
    teacherDetails? : ITeacherDetails;
    adminDetails? : IAdminDetails;
    public HomeAddress!: IAddress;
   constructor(
    Id:string,
    firstName: string,
    lastName: string,
    HomeAddress:IAddress ,
    studentDetails? : StudentDetails,
    teacherDetails? : ITeacherDetails,
    adminDetails? : IAdminDetails
   ){
        if(studentDetails){
       this.Id = Id;
       this.firstName = firstName;
       this.lastName = lastName;
       this.studentDetails = studentDetails;
       this.HomeAddress = HomeAddress;
        }
        else if(teacherDetails){
            this.Id = Id;
            this.firstName = firstName;
            this.lastName = lastName;
            teacherDetails = teacherDetails;
            this.HomeAddress = HomeAddress;

        }
        else if(adminDetails){
            this.Id = Id;
            this.firstName = firstName;
            this.lastName = lastName;
            adminDetails = adminDetails;
            this.HomeAddress = HomeAddress;

        }
   }
   
}
export interface IEntity {
    userId: string | any;
    email: string | any;
    firstName: string | any;
    lastName: string;
    // studentDetails? : StudentDetails;
    // teacherDetails? : ITeacherDetails;
    // adminDetails? : IAdminDetails;
    // HomeAddress : IAddress;
    Class: string;
    section: string;
    department?: string;
    specialization?: string;
    parentId?: string;
    currentAddress: string;
    permanentAddress: string;
}
export interface IAddress {
    currentAddress: string;
    permanentAddress: string;
}
export interface StudentDetails {
    class: string;
    section: string;
    parentId: string;
}
export interface ITeacherDetails {
    department: string;
    specialization: string;
    class: string;
    section: string;
}
export interface IAdminDetails {
    department: string;
    specialization: string
}