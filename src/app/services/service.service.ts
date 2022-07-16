import { Injectable } from '@angular/core';
import { IPost, IUser } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private posts: Array<IPost> = [
    {
      id: 1,
      postedBy: "admin",
      topic: "Post",
      date: new Date(),
      massage: 'Sing up to create your account and start to use Angular Blog',
    },
  ];

  private users: Array<IUser> = [
    {
      id: 1,
      userName: 'admin',
      email: 'admin@gmail.com',
      password: '111111',
    }
  ];


  constructor() { }


  getPost(): Array<IPost> {
    return this.posts;
  }

  getUser(): Array<IUser> {
    return this.users;
  }


  addUser(user: IUser): void{
    this.users.push(user);
  }

  addPost(post: IPost): void{
    this.posts.push(post);
  }

  deletePost (id: number): void {
    const index = this.posts.findIndex(post => post.id === id);
    this.posts.splice(index, 1);
  }

  updatePost(post: IPost, id: number): void {
    const index = this.posts.findIndex(post => post.id === id);
    this.posts.splice(index, 1, post);
  }
}

// id: number;
// postedBy: string;
// topic: string;
// date: number;
// massage: string;
