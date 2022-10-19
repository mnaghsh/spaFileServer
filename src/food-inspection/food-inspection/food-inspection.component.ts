

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { FoodInspectionService } from 'src/app/services/foodInspection/foodInspection.service';
import { TypesOfFoodComponent } from '../types-of-food/types-of-food.component';
import * as moment from 'jalali-moment';
import { foodManufacturesComponent } from '../food-manufactures/food-manufactures.component';

@Component({
  selector: 'app-food-inspection',
  templateUrl: './food-inspection.component.html',
  styleUrls: ['./food-inspection.component.css']
})
export class FoodInspectionComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dateOfInspection') dateOfInspection: ElementRef;
  @ViewChild('dateOfProduction') dateOfProduction: ElementRef;
  @ViewChild('dateOfExpiration') dateOfExpiration: ElementRef;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'datDischargeHsfin', 'namTypeOfFood', 'namFoodManufacture', 'numValueHsfin',
    'namUnitOfValueHsfin', 'namRefrigerationConditionsHsfin', 'datOfManufactureHsfin', 'datOfExpirationHsfin',
    'numTemperatureHsfin',  'namInspectionResultHsfin',
    'namDischargePlaceHsfin', 'desDescriptionHsfin',
    'process'];
  ListOfFoodInspection: any;

  newRowObj: any;
  namTypeOfFoodHstof: any;
  typeOfFoodId: any;
  foodManufactureId: any;
  namFood: any;
  namManufacture: any;
  RefrigerationConditions: { value: number; viewValue: string; }[];
  inspectionResult: { value: number; viewValue: string; }[];
  dischargePlace: { value: number; viewValue: string; }[];
  constructor(
    public commonService: CommonService,
    public foodInspectionService: FoodInspectionService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData

  ) {
    this.getFoodInspection();
    this.fillDropDowns()
  }
  ngOnInit(): void {
    this.newRowObj = {}

  }
  getFoodInspection() {
    this.commonService.loading = true;
    this.foodInspectionService.selectAllListOfHseFoodInspections().subscribe((success) => {
      this.ListOfFoodInspection = success;
      this.convertToShamsi()
      //console.log('ListOfFoodInspection', this.ListOfFoodInspection)
      this.dataSource = new MatTableDataSource(this.ListOfFoodInspection);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {
    //debugger
    let dateIn = moment(this.dateOfInspection.nativeElement.value, 'jYYYY/jM/jD HH:mm:ss');
    let dateOfInspection = dateIn.locale('en').format('YYYY/M/D HH:mm:ss');
    let datePo = moment(this.dateOfProduction.nativeElement.value, 'jYYYY/jM/jD HH:mm:ss');
    let dateOfProduction = datePo.locale('en').format('YYYY/M/D HH:mm:ss');
    let dateEx = moment(this.dateOfExpiration.nativeElement.value, 'jYYYY/jM/jD HH:mm:ss');
    let dateOfExpiration = dateEx.locale('en').format('YYYY/M/D HH:mm:ss');


    let object = {
      "datDischargeHsfin": new Date(dateOfInspection),
      "hstofTypeOfFoodId": this.typeOfFoodId,
      "namTypeOfFood": this.namFood,
      "namFoodManufacture": this.namManufacture,
      "hsmanFoodManufactureId": this.foodManufactureId,
      "numValueHsfin": this.newRowObj.numValueHsfin,
      "namUnitOfValueHsfin": this.newRowObj.namUnitOfValueHsfin,
      "datOfManufactureHsfin": new Date(dateOfProduction),
      "datOfExpirationHsfin": new Date(dateOfExpiration),
      "numTemperatureHsfin": this.newRowObj.numTemperatureHsfin,
     // "numEnvironmentTemperatureHsfin": this.newRowObj.numEnvironmentTemperatureHsfin,
      "namInspectionResultHsfin": this.newRowObj.namInspectionResultHsfin,
      "namDischargePlaceHsfin": this.newRowObj.namDischargePlaceHsfin,
      "desDescriptionHsfin": this.newRowObj.desDescriptionHsfin,
      "createInfo": this.commonService.activeUser.firstname + this.commonService.activeUser.lastname,
      "createDate": new Date(),
      "namRefrigerationConditionsHsfin": this.newRowObj.namRefrigerationConditionsHsfin
    }

    this.foodInspectionService.insertListOfHseFoodInspections(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getFoodInspection();
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
    this.foodInspectionService.updateListOfHseFoodInspections(row['foodInspectionId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getFoodInspection();
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
    this.foodInspectionService.deleteListOfHseFoodInspections(row['foodInspectionId']).subscribe(
      (success) => {

        this.getFoodInspection();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        //console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  selectRow(row) {
    //console.log(row)
    if (!this.edit) {
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

  selectTypeOfFoods() {

    const dialogRef = this.dialog.open(TypesOfFoodComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        //debugger;
        this.namFood = data.namTypeOfFoodHstof;
        this.typeOfFoodId = data.typeOfFoodId;
        //  this.checklistId = data.eCheckListId;
      }
    )
  }

  selectFoodManufactures() {
    const dialogRef = this.dialog.open(foodManufacturesComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        // debugger;
        this.namManufacture = data.namFoodManufactureHsman;
        this.foodManufactureId = data.foodManufactureId;
        //  this.checklistId = data.eCheckListId;
      }
    )
  }


  convertToShamsi() {
    this.ListOfFoodInspection.forEach(item => {
      if (item.datDischargeHsfin)
        
      item.datDischargeHsfin = moment(item.datDischargeHsfin).locale('fa').format('YYYY/MM/DD');
      if (item.datOfManufactureHsfin)
        item.datOfManufactureHsfin = moment(item.datOfManufactureHsfin).locale('fa').format('YYYY/MM/DD');
      if (item.datOfExpirationHsfin)
        item.datOfExpirationHsfin = moment(item.datOfExpirationHsfin).locale('fa').format('YYYY/MM/DD');

    });
  }
  fillDropDowns() {

    this.RefrigerationConditions = [
      { value: 1, viewValue: 'منجمد ' },
      { value: 2, viewValue: 'دمای یخچال' },
      { value: 3, viewValue: 'دمای محیط' },
    ];
    this.inspectionResult = [
      { value: 1, viewValue: 'بازدید و فک پلمپ  ' },
      { value: 2, viewValue: 'بازدید و فک پلمپ مشروط' },
      { value: 3, viewValue: 'عدم تایید' },
    ];
    this.dischargePlace = [
      { value: 1, viewValue: 'مرکز طبخ 1  ' },
      { value: 2, viewValue: 'مرکز طبخ 2' },
      { value: 3, viewValue: 'مرکز طبخ 3' },
    ];
    
    

     }

}


