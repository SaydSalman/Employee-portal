import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'highcharts';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  
  @Output() onAdminChange = new EventEmitter()
  adminDetails:any={}
  editAdminStatus:boolean=false
  profilePicture:string="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"

  constructor(private adminAPI:AdminService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails = res;
      if(res.profilePic){
        this.profilePicture = res.profilePic
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus=true
  }
  onCancel(){
    this.editAdminStatus=false
  }
  getFile(event:any) {
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file);
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profilePicture = event.target.result
      this.adminDetails.profilePic = event.target.result
      
    }
  }
  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toastr.success("Admin Details are updated successfully")
        sessionStorage.setItem("adminDetails",JSON.stringify(res));
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        
        this.toastr.error("Updation failed")
      }
    }
    )
  }
}
