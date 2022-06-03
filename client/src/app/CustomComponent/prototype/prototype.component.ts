import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {

  constructor(private ds : DataService) { }

  sendmessage(array : Array<number>){
    this.ds.callToggle.next(array);
  }

  ngOnInit(): void {
  }
  s : String = 'Student';
  activearray : Array<number> = [0,1];
  switchup(i : number){
    if ( i == 1 ){
      this.s = 'Student A';
      this.activearray[0] = 1;
      this.sendmessage(this.activearray);
    }
    else if ( i == 2 ){
      this.s = 'Student B';
      this.activearray[0] = 2;
      this.sendmessage(this.activearray);
    }
    else if ( i == 3 ){
      this.s = 'Student C';
      this.activearray[0] = 3;
      this.sendmessage(this.activearray);
    }
  }
  tabswitch(i : number){
    if ( i == 1 ){
      this.activearray[1] = 1;
      this.sendmessage(this.activearray);
    }
    else if ( i == 2 ){
      this.activearray[1] = 2;
      this.sendmessage(this.activearray);
    }
    else if ( i == 3 ){
      this.activearray[1] = 3;
      this.sendmessage(this.activearray);
    }
  }
}
