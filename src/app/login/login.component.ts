import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = ""
  password:string = ""

  constructor(private toaster:ToastrService,private api:AdminService,private  router:Router){

  }

 login() {
    //define admin logic function
    if(this.email && this.password){
      // this.toaster.success("proceed to api")
      this.api.getAdminDetails().subscribe({
        next:(response:any)=>{
          console.log(response);
          const {email,password} = response;
          if(email == this.email && password == this.password){
            this.toaster.success("login Successfull")
            sessionStorage.setItem("adminDetails",JSON.stringify(response));
            this.email=""
            this.password=""
            //navigate
            this.router.navigateByUrl("/dashboard")
          }else{
            this.toaster.error("Invalid Credentials");
          }
          
        },
        error:(reason:any)=>{
          this.toaster.error(reason.message)
        }
      })
    }else{
      this.toaster.info("please fill the form completely")
    }

  }
}
