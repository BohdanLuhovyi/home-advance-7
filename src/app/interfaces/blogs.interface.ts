export interface IBlogs {
    id: number;
    title: string;
    text: string;
    author: string;
    imagePath: string;
}


export interface IBlogsRequests {
    title: string;
    text: string;
    author: string;
    imagePath: string;
}

export interface IBlogsResponse extends IBlogsRequests{
    id: number;
}