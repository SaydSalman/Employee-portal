import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  //store all users
  
  allUsers:UserSchema[]=[]
  searchKey:string=""
  page: number = 1;
  constructor(private api:ApiService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.getAllUsersList()
  }
  getAllUsersList(){
    this.api.getAllUsersAPI().subscribe({
      next:(response:any)=>{
        this.allUsers=response
        console.log(this.allUsers);
        
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
  deleteUser(id:any){
    this.api.deleteUserAPI(id).subscribe((res:any)=>{
      this.toastr.success("User Removed");
      this.getAllUsersList()
    })
  }
  generatePDF(){
    let pdf = new jspdf()
    let head =[['EmpId','Username','Email','Status']]
    let body:any=[];
    this.allUsers.forEach((item:any)=>{
      if(item.id!='1'){
        body.push([item.empId,item.name,item.email,item.status])
      }
    })
    pdf.setFontSize(16)
    pdf.text('All Users List',10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }
  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.empId))
  }
  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
  }
}
