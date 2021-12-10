export class PostModel {
    constructor (
        public id: number,
        public user_id: string,
        public username: string,
        public photo: string,
        public caption: string,
        public location: string,
        public postTime
    ) {}
}