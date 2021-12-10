export class UserModel{
    constructor (
        public id:string,
        public password:string,
        public name:string,
        public bio:string = "",
        public gender:string = "",
        public birth_date:Date = null,
        public photo:string = ""){}
}