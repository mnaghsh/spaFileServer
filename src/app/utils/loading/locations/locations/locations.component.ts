import { Component, OnInit, ViewChild, OnChanges, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';
import { ChecklistQuestionService } from 'src/app/services/checklistQuestions/checklist-question.service';
import { ChecklistOptionsService } from 'src/app/services/checklistOptions/checklist-options.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ZonesComponent } from 'src/app/utils/zones/zones.component';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';



@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'locationId', 'namLocation','zonesZoneId','process'];
  ListOfcheckListsOptions: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  checklistId: any;

  checklistName: any;
  firstLevel = this.fb.group({
    firstCtrl: ['', Validators.required],

  });
  filteredLocation: any;
  filtered=false;

  constructor(
    private fb: FormBuilder,
    private requestChecklist: RequestChecklistService,
    public locationsService: LocationsService,
    public commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData
  ) {
    // this.checklistId = recievedData.checkListId
    // this.checklistName = recievedData.checkListName
    this.changeFilter();
  }

  ngOnInit() {
    this.department = [
      { value: 1, viewValue: 'آهن سازی' },
      { value: 2, viewValue: 'فولاد سازی' },
      { value: 3, viewValue: 'نورد گرم' },
      { value: 4, viewValue: 'نورد سرد' },
      { value: 5, viewValue: 'انرژی سیالات' },
      { value: 6, viewValue: 'مدیریت شهری' },
      { value: 7, viewValue: 'تعمیرگاه مرکزی' },
      { value: 8, viewValue: 'حمل و نقل' },
      { value: 9, viewValue: 'کنترل مواد' },
      { value: 10, viewValue: 'تعميرات مرکزي' },
      { value: 11, viewValue: 'ستادي' },
      { value: 12, viewValue: 'خدمات عمومی' },
      { value: 13, viewValue: 'خارج از فولاد' },
    ];
    this.newRowObj = {}

  }

  public getLocations() {
    this.commonService.loading = true;
    this.locationsService.selectAllListOflocations().subscribe((success) => {
      this.ListOfcheckListsOptions = success;
      //console.log('ListOfcheckListsOptions', this.ListOfcheckListsOptions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsOptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;

    });
  }


  public addRow() {
    //debugger
    let object = {
      "namLocation": this.newRowObj.namLocation,
      "zonesZoneId": this.newRowObj.zonesZoneId,
      // "createDate": new Date()
    }

    this.locationsService.insertListOflocations(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getLocations();
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


    if (row.zonesZoneId == "") {
      row.zonesZoneId = null;
    }


    this.locationsService.updateListOflocations(row['locationId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getLocations();
      //console.log('updateListOfcheckListsQuestions', success)
      ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {
    // debugger
    //console.log('del', row)

    this.locationsService.deleteListOflocations(row['locationId']).subscribe(
      (success) => {

        this.getLocations();
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

  selectZones(row?) {


    const dialogRef = this.dialog.open(ZonesComponent, {
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

        if (row) {
          row.zonesZoneId = data.zoneId;
          row.namZone = data.namZone;
        }
        this.newRowObj.zonesZoneId = data.zoneId;

        // this.namChkHecli = data.namChkHecli;
        //this.namLocationHsrch = data.namLocationHsrch;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
        //this.firstLevel.controls['firstCtrl'].setValue(data.namZone);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });

      }
    )

  }
  changeFilter() {
    
    this.filtered=!this.filtered;
    if(this.filtered==true){
    this.filteredLocation=[];
    this.commonService.loading = true;
    this.locationsService.selectAllListOflocations().subscribe((success) => {

      this.ListOfcheckListsOptions = success;
      this.requestChecklist.selectAllListOfRequestCheckLists().subscribe((data) => {
        this.ListOfcheckListsOptions.forEach(eachLocation => {
          data.forEach(eachRequest => {
            
            if (eachLocation.locationId == eachRequest.locationIdHsrch) {
             
              this.filteredLocation.push(eachLocation)
            }
          });

        });
        this.filteredLocation = this.filteredLocation.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.locationId === value.locationId
          //&& t.value === value.value
        ))
      )
        console.log('filteredLocation', this.filteredLocation)
        this.dataSource = new MatTableDataSource(this.filteredLocation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commonService.loading = false;
        
      })
  
    });
  
  }
  else{
    this.getLocations()
  }
}
}