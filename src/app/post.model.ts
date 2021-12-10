export class PostModel {
    constructor (
        public id: number,
        public username: string,
        public photo: string,
        public caption: string,
        public location: string,
        public postTime
    ) {}
}