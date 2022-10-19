import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadingDialog',
  templateUrl: './loadingDialog.component.html',
  styleUrls: ['./loadingDialog.component.scss']
})
export class LoadingDialogComponent implements OnInit {

  constructor(private myRoute:Router) {
   
   }

  ngOnInit() {
  }

}
