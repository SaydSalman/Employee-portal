import { Component, OnInit } from '@angular/core';
import { ApiService } from '../modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminName:any=""
  sideBarStatus:boolean = true
  userCount:number=0
  constructor(private userAPI:ApiService,private router:Router){}
  ngOnInit(): void{
    this.getTotalEmployeeCount()
    if(sessionStorage.getItem("adminDetails")){
      this.adminName = JSON.parse(sessionStorage.getItem("adminDetails") || "").name
    }
  }

  menuBtnClicked(){
    this.sideBarStatus=!this.sideBarStatus;
  }
  getTotalEmployeeCount(){
    this.userAPI.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }
  onAdminChange(event:any){
    this.adminName = event
  }
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('')
  }
}
