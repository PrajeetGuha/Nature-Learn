import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private ds : DataService) { }

  ngOnInit(): void {
  }

  sendmessage(check : number){
    this.ds.callToggle.next(check);
  }

  tab : String = 'about'
  onClick(check: number){
    if (check == 1){
      this.tab = 'about';
      this.sendmessage(1);
    }
    else if (check == 2){
      this.tab = 'instructions';
      this.sendmessage(2);
    }
    else{
      this.tab = 'prototype'
      this.sendmessage(3);
    }
  }

}
