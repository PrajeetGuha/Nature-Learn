import { Component, OnInit } from '@angular/core';
import { DataService } from '../prototype/data.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  profile_edit: boolean = false;
  button_text : string = 'Edit';

  students = [{ name: "StudentA", email: "student@test.net", gender: 0, items : [{
    header : 'Excursion', 
    title : 'Visit to Botanical Garden', 
    description : 'A visit undertaken by school to the Indian Botanical Garden', 
    date : '12/12/2021'},{
    header : 'Excursion', 
    title : 'Visit to Botanical Garden', 
    description : 'A visit undertaken by school to the Indian Botanical Garden', 
    date : '12/15/2021'}] },

  { name: "StudentB", email: "student@test.net", gender: 1 },
  { name: "StudentC", email: "student@test.net", gender: 0 }]

  activestudent: any = 0;
  activestudentid : number = 0;
  activewindow: any = 0;

  constructor(private ds: DataService, private ms : ModalService) {
    this.ds.callToggle.subscribe((data) => { this.operatechange(data) });
  }

  ngOnInit(): void {
  }

  closemodal(id : string){
    this.ms.close(id);
  }

  openmodal(id : string){
    this.ms.open(id);
  }

  closeaftersave(id : string){
    
  }

  operatechange(k: any) {
    console.log(k);
    if (k[0] != 0) {
      this.changestudent(k[0] - 1);
      this.changewindow(k[1]);
    }
  }

  changestudent(s: number) {
    this.activestudent = this.students[s];
    this.activestudentid = s;
    // console.log(this.activestudent.name);
  }

  changewindow(s: number) {
    if (s == 1 && this.activestudent != 0) {
      this.activewindow = 'profile';
      this.setprofile();
    }
    else if (s == 2 && this.activestudent != 0) {
      this.activewindow = 'data';
      this.setdata();
    }
    else if (s == 3 && this.activestudent != 0) {
      this.activewindow = 'evaluation';
    }
  }

  name : string = '';
  email : string = '';
  gender : number = -1;
  items : any;

  setprofile(){
    this.name = this.activestudent.name;
    this.email = this.activestudent.email;
    this.gender = this.activestudent.gender;

    console.log(this.name);
    (<HTMLInputElement>document.getElementById("Name")).value = this.name;
    (<HTMLInputElement>document.getElementById("Email")).value = this.email;

    
  }

  setdata(){
    this.items = this.activestudent.items;
  }

  daysgone(date : string){
    let startdate = new Date(date);
    let today = new Date();
    return Math.ceil((today.getTime() - startdate.getTime()) / (1000 * 60 * 60 * 24)) - 1;
  }

  profile_operate() {
    this.profile_edit = !this.profile_edit;
    if (!this.profile_edit){
      this.button_text = 'Edit';
      this.name = (<HTMLInputElement>document.getElementById("Name")).value;
      this.email = (<HTMLInputElement>document.getElementById("Email")).value;
      var genderradios = document.getElementsByName('GenderRadio');
      for ( var i = 0; i < 2; i++){
        var b = <HTMLInputElement>genderradios.item(i);
        if (b.checked){
          this.gender = i;
        }
      }
      this.students[this.activestudentid].name = this.name;
      this.students[this.activestudentid].email = this.email;
      this.students[this.activestudentid].gender = this.gender;
    }
    else{
      this.button_text = 'Save Changes';
    }
  }
}
