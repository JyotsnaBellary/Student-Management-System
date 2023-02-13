export interface Iparent{
    name: string;
    phoneNumber:string;
    emailId:string;
}
export class Parents{
    parentId!:string;
    father!:Iparent;
    mother!:Iparent;
    constructor(parentId: string, father?:Iparent, mother?:Iparent){
        if(father && mother){
            this.parentId = parentId;
            this.father = father;
            this.mother = mother;
        }
        else if(father){
            this.parentId = parentId;
            this.father = father;
        }
        else if(mother){
            this.parentId = parentId;
            this.mother = mother;
        }
        
    }
}