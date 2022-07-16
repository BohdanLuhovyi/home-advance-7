export interface IPost {
    id: number;
    postedBy: string;
    topic: string;
    date: Date;
    massage: string;
}

export interface IUser {
    id: number;
    userName: string;
    email: string;
    password: string;
}


//  id, postedBy, topic, date, message