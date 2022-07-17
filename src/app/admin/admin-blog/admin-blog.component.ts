import { Component, OnInit } from '@angular/core';
import { IBlogs } from 'src/app/interfaces/blogs.interface';
import { BlogsServiceService } from 'src/app/service/blogs-service.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  public adminBlogs!: IBlogs[];

  public titleInput!: string;
  public textInput!: string;
  public authorInput!: string;
  public imagePath = 'https://planbphoto.com/wp-content/uploads/Serze.jpg';
  public editStatus = false;
  public editID!: number; 


  constructor(
    private blogsService: BlogsServiceService
  ) { }

   ngOnInit(): void {
    this.getBlogs()
   }
 
   getBlogs(): void {
     this.blogsService.getAll().subscribe(data => {
       this.adminBlogs = data;
     });
   }
 
   addBlog(): void {
     const newBlog = {
       title: this.titleInput,
       text: this.textInput,
       author: this.authorInput,
       imagePath: this.imagePath
     };
     this.blogsService.create(newBlog).subscribe(() => {
       this.getBlogs();
       this.resetForm()
     })
   }
 
   editBlog(blog: IBlogs): void {
     this.titleInput = blog.title;
     this.textInput = blog.text;
     this.authorInput = blog.author;
     this.imagePath = blog.imagePath;
     this.editStatus = true;
     this.editID = blog.id;
   }
 
 
   saveBlog(): void {
     const updateBlog = {
      title: this.titleInput,
      text: this.textInput,
      author: this.authorInput,
      imagePath: this.imagePath
     };
     this.blogsService.update(updateBlog, this.editID).subscribe(() => {
       this.getBlogs();
       this.resetForm();
     })
   }
 
 
   deleteBlog(blog: IBlogs): void {
     if(confirm('Are you sure?')){
       this.blogsService.delete(blog.id).subscribe(() => {
         this.getBlogs();
       })
     }
   }
 
   private resetForm(): void {
     this.titleInput = '';
     this.textInput = '';
     this.authorInput = '';
     this.imagePath = 'https://planbphoto.com/wp-content/uploads/Serze.jpg';
     this.editStatus = false;
   }

}
