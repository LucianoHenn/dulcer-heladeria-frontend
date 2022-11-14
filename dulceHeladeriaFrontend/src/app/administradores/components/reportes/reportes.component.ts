import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import { range } from '../../interfaces/range';
import { RangeService } from '../../services/range.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  @ViewChild('start') start : HTMLInputElement; 
  @ViewChild('end') end : HTMLInputElement; 
  public myRange : range = {start : null, end : null}; 
  myStart : Date 
  myEnd : Date; 
  isStock:boolean = false; 

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  constructor(private rangeService : RangeService) {
    
    //this.firstDate.setDate(this.currentDate.getDate() - 6);
    //this.myRange = {start:this.firstDate , end: this.currentDate}
    //this.rangeService.nextState(this.myRange);
   }

  ngOnInit(): void {
    
  }

  changeReport() {
    this.isStock = !this.isStock;
  }

  // dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
  //     this.myRange = {
  //       start : this.range.value.start,
  //       end: this.range.value.end
  //   }
  //   this.rangeService.nextState(this.myRange);

  //}

  // isDateRangeChanged() {
  //   return this.myRange.end != null && this.myRange.start != null
  // }

  sendDate(start:any,end:any){
    this.myRange.start=start;
    this.myRange.end=end;
    this.rangeService.nextState(this.myRange);
  }

  hello(msg: string, event: any){
    alert(msg + event); 
  }

  send(){
    let start1 = this.range.value.start;
    let end2 = this.range.value.end;
    console.log("SXKSLMXDSMD")
    console.log(start1);
    console.log(end2);
    this.sendDate(start1,end2);
  }


}
