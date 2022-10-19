import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UsersService } from '../services/users/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'firstname', 'lastname', 'username', 'password', 'personCode', 'mobile', 'higherPerson', 'accessLevel', 'section', 'process'];
  newRowObj: any;
  listOfAllUsers: any;
  section = [
    { value: 1, viewValue: 'ايمني' },
    { value: 2, viewValue: 'محیط زیست' },
    { value: 3, viewValue: 'بهداشت حرفه ای ' },
  ];
  accessLevel = [
    { value: 1, viewValue: 'مدیر' },
    { value: 2, viewValue: 'کارشناس' },
    { value: 3, viewValue: 'بازرس' },
  ];
  username: any;
  higerPersonUsername: any;
  constructor(
    public commonService: CommonService,
    private myRoute: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    public usersService: UsersService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    @Inject(MAT_DIALOG_DATA) public recievedData
  ) {

    this.getAllUsers();
  }

  ngOnInit() {
    this.newRowObj = {}

  }

  selectUsers(element) {
    {
      debugger
      const dialogRef = this.dialog.open(UsersComponent, {
        width: "80%",
        height: "80%",
        data: {
          // checkListId: row.eCheckListId,
          //  checkListName: row.desChkHecli,
        }
      });
      dialogRef.afterClosed().subscribe(
        (data) => {
          if(element){
            element.higherPerson=(data.firstname+" "+data.lastname)
          }
         // this.higerPersonUsername = data.id
          this.newRowObj.higherPerson=(data.firstname+" "+data.lastname)

        }
      )
    }
  }


  public getAllUsers() {
    if (this.commonService.activeUser.accessLevel != "مدیر") {
      this.commonService.showEventMessage("شما دسترسی به محتوای این فرم را ندارید.", 3000, "green")
      this.myRoute.navigate(['menu']);
      return
    }
    this.commonService.loading = true;
    this.usersService.selectAllUsers().subscribe((success) => {
      this.listOfAllUsers = success;
      console.log('listOfAllUsers', this.listOfAllUsers)
      this.dataSource = new MatTableDataSource(this.listOfAllUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }


  public addRow() {

    let object = {
      "username": this.newRowObj.username,
      "password": this.newRowObj.password,
      "firstname": this.newRowObj.firstname,
      "lastname": this.newRowObj.lastname,
      "personCode": this.newRowObj.personCode,
      "mobile": this.newRowObj.mobile,
      "higherPerson": this.newRowObj.higherPerson
    }

    this.usersService.insertUsers(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getAllUsers();
      console.log('updateListOfcheckLists', success)
      this.newRowObj = {};
    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }
  public editRow(row) {
    row.updateDate = new Date()
    this.edit = !this.edit;
    row['editable'] = true;
  }

  public updateRow(row) {
    this.edit = !this.edit;
    this.usersService.updateUsers(row['id'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getAllUsers();
      ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.usersService.deleteUsers(row['id']).subscribe(
      (success) => {

        this.getAllUsers();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row) {
    console.log(row)
    if (!this.edit) {
      this.dialogRef.close(row)
    }
  }

}