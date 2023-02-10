export interface ILogin{
    email: String;
    password: String;
}

export class Login {
    email: String;
    password: String;
    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }

}