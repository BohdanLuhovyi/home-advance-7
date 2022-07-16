import { Component, OnInit } from '@angular/core';
import { IPost, IUser } from '../interfaces/page.interface';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public postArray: Array<IPost> = [];
  public userArray: Array<IUser> = [];

  // public signUpSubmitDisabled = true;

  public signUpUserInput!: string;
  public signUpEmailInput!: string;
  public signUpPasswordInput!: string;

  public signInEmailInput!: string;
  public signInPasswordInput!: string;

  public addPostTitleInput!: string;
  public addPostMassageInput!: string;
  public editStatus = false;
  public editID!: number; 


  public signed = false;
  public signedInfo = true;
  public userName = ''

  constructor(
    private postService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.getUser()
  }

  getPost(): void {
    this.postArray = this.postService.getPost();
  }

  getUser(): void {
    this.userArray = this.postService.getUser();
  }

  // checkSignUpSubmitDisabled(): void {
  //   if(!this.signUpUserInput && !this.signUpEmailInput && !this.signUpPasswordInput){
  //     this.signUpSubmitDisabled = false;
  //   }
  // } 

  signInSubmit(): void{
    for(let i = 0; i<this.userArray.length; i++){
      if(this.userArray[i].email === this.signInEmailInput && this.userArray[i].password === this.signInPasswordInput){
        console.log('you logged');
        this.userName = this.userArray[i].userName;
        this.signInEmailInput = '';
        this.signInPasswordInput = '';

        this.signed = true;    
        this.signedInfo = false;    
    
        return;
      }
    }
    alert('Account not founded')
    console.log(this.userArray);
    this.signInEmailInput = '';
    this.signInPasswordInput = '';
  }

  signUpSubmit(): void{
    for(let i = 0; i<this.userArray.length; i++){
      if(this.userArray[i].email === this.signUpEmailInput || this.userArray[i].userName === this.signUpUserInput){
        alert('Account with this name or eMail already registered')
        this.signUpUserInput = '';
        this.signUpEmailInput = '';
        this.signUpPasswordInput = '';
        return;
      }
    }
    let newUser = {
      id: 1,
      userName: this.signUpUserInput,
      email: this.signUpEmailInput,
      password: this.signUpPasswordInput,
    }

    if(this.userArray.length > 0) {
      const id = this.userArray.slice(-1)[0].id
      newUser.id = id + 1;
    }
    this.postService.addUser(newUser); 
    
    this.signed = true;
    this.signedInfo = false;  
    this.userName = newUser.userName;

    this.signUpUserInput = '';
    this.signUpEmailInput = '';
    this.signUpPasswordInput = '';
  }

  addPost(): void{
    let newPost = {
      id: 1,
      postedBy: this.userName,
      topic: this.addPostTitleInput,
      date: new Date(),
      massage: this.addPostMassageInput,
    }

    if(this.userArray.length > 0) {
      const id = this.userArray.slice(-1)[0].id
      newPost.id = id + 1;
    }
    this.postService.addPost(newPost); 
    
    this.addPostTitleInput = '';
    this.addPostMassageInput = '';
  }

  editPost(post: IPost): void {
    this.addPostTitleInput = post.topic;
    this.addPostMassageInput = post.massage;
    this.editStatus = true;
    this.editID = post.id;
  }
  
  savePost(): void {
    let updatePost = {
      id: this.editID,
      postedBy: this.userName,
      topic: this.addPostTitleInput,
      date: new Date(),
      massage: this.addPostMassageInput,
    };
    this.postService.updatePost(updatePost, this.editID);

    this.addPostTitleInput = '';
    this.addPostMassageInput = '';
    this.editStatus = false;
  }


  deletePost(post: IPost): void {
    if(confirm('Are you sure?')){
      this.postService.deletePost(post.id);
    }
  }

  closeModalAdd(): void {
    this.addPostTitleInput = '';
    this.addPostMassageInput = '';
    this.editStatus = false;
  }

  signOut(): void {
    this.signed = false;
    this.signedInfo = true;  
    this.userName = '';
  }
}
