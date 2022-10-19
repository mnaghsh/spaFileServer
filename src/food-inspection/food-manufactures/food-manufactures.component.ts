
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { FoodManufacturesService } from 'src/app/services/FoodManufactures/FoodManufactures.service';

@Component({
  
  selector: 'app-food-of-manufactures',
  templateUrl: './food-manufactures.component.html',
  styleUrls: ['./food-manufactures.component.css']
})
export class foodManufacturesComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'namFoodManufactureHsman', 'process'];
  ListOfTypeOfFoods: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  checklistId: any;
  checklistName: any;
  constructor(
    public commonService: CommonService,
    public foodManufactorServices: FoodManufacturesService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData

  ) {
    this.getTypeOfFoods();
  }
  ngOnInit(): void {
    this.newRowObj = {}

  }
  getTypeOfFoods() {
    this.commonService.loading = true;
    this.foodManufactorServices.selectAllListOfHseFoodManufactores().subscribe((success) => {
      this.ListOfTypeOfFoods = success;
      //console.log('ListOfTypeOfFoods', this.ListOfTypeOfFoods)
      this.dataSource = new MatTableDataSource(this.ListOfTypeOfFoods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  
  public addRow() {
    
    let object = {
      "namFoodManufactureHsman": this.newRowObj.namFoodManufactureHsman,
     // "namLocation": this.checklistId,
      // "createDate": new Date()
    }

    this.foodManufactorServices.insertListOfHseFoodManufactores(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getTypeOfFoods();
      //console.log('updateListOfcheckLists', success)
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
    this.foodManufactorServices.updateListOfHseFoodManufactores(row['foodManufactureId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getTypeOfFoods();
      //console.log('updateListOfcheckListsQuestions', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    //console.log('del', row)
    this.foodManufactorServices.deleteListOfHseFoodManufactores(row['foodManufactureId']).subscribe(
      (success) => {

        this.getTypeOfFoods();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        //console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  selectRow(row){
    //console.log(row)
    if(!this.edit){
      this.dialogRef.close(row)
    }
    
  }

 
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

