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
  button_text: string = 'Edit';

  students = [{
    name: "StudentA", email: "student@test.net", gender: 0, items: [
      {
      header: 'Excursion',
      titlename: 'Visit to Botanical Garden',
      description: 'A visit undertaken by school to the Indian Botanical Garden',
      score: ['89', '100'],
      date: '12/12/2021'
    },
    {
      header: 'Knowledge Check',
      titlename: 'Quiz',
      description: 'Animals and Plants',
      score: ['7', '10'],
      date: '12/15/2021'
    }, {
      header: 'Extra-Curriculum Activity',
      titlename: 'Plant Trees',
      description: 'Planting trees in school garden',
      score: ['10', '10'],
      date: '09/23/2021'
    }, {
      header: 'Excursion',
      titlename: 'Visit to the Museum',
      description: 'A visit to Indian Museum',
      score: ['48', '50'],
      date: '11/03/2021'
    }, {
      header: 'Extra-Curriculum Activity',
      titlename: 'Earth Day',
      description: 'Poster Making Competition',
      score: ['32', '35'],
      date: '04/22/2021'
    }, {
      header: 'Excursion',
      titlename: 'Nature Park',
      description: 'Visit to local Nature Park and also plant trees',
      score: ['30', '40'],
      date: '10/22/2020'
    }
  ]
  },

  { name: "StudentB", email: "student@test.net", gender: 1, items: [] },
  { name: "StudentC", email: "student@test.net", gender: 0, items: [] }]

  activestudent: any = 0;
  activestudentid: number = 0;
  activewindow: any = 0;

  constructor(private ds: DataService, private ms: ModalService) {
    this.ds.callToggle.subscribe((data) => { this.operatechange(data) });
  }

  ngOnInit(): void {
  }

  closemodal(id: string) {
    (<HTMLInputElement>document.getElementById("title")).value = '';
    (<HTMLInputElement>document.getElementById("descriptionbox")).value = '';
    (<HTMLInputElement>document.getElementById("dateofactivity")).value = '';
    (<HTMLInputElement>document.getElementById("scored")).value = '';
    (<HTMLInputElement>document.getElementById("total")).value = '';
    (<HTMLInputElement>document.getElementById("activity")).value = '0';
    this.ms.close(id);
  }

  openmodal(id: string) {
    this.ms.open(id);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var ddt, mmt;

    if (dd < 10) {
      ddt = '0' + dd;
    }
    else{
      ddt = dd;
    }

    if (mm < 10) {
      mmt = '0' + mm;
    }
    else{
      mmt = mm;
    }
    var todayt = yyyy + '-' + mmt + '-' + ddt;
    (<HTMLInputElement>document.getElementById('dateofactivity')).setAttribute('max',todayt);
  }

  closeaftersave(id: string) {

    var dict = { header: '', titlename: '', description: '', score: ['', ''], date: '' };
    var temp = (<HTMLInputElement>document.getElementById("activity")).value;
    if (temp == '1') {
      dict.header = "Excursion";
    }
    else if (temp == '2') {
      dict.header = "Knowledge Check";
    }
    else if (temp == '3') {
      dict.header = "Extra-Curriculum Activity";
    }
    else {
      alert('Incorrect choice of activity');
      return;
    }
    var titlen = (<HTMLInputElement>document.getElementById("title")).value;
    if (titlen == '') {
      alert('Give a proper title');
      return;
    }
    dict.titlename = titlen;
    var description = (<HTMLInputElement>document.getElementById("descriptionbox")).value;
    if (description == '') {
      alert('Give a proper description');
      return;
    }
    dict.description = description;
    var date = (<HTMLInputElement>document.getElementById("dateofactivity")).value;
    date = date.slice(5, 7) + '/' + date.slice(8) + '/' + date.slice(0, 4);
    if ( date == '//' ){
      alert('Give a valid date');
      return;
    }
    dict.date = date;

    var score = (<HTMLInputElement>document.getElementById("scored")).value;
    var total = (<HTMLInputElement>document.getElementById("total")).value;

    if (isNaN(+score) || score == ''){
      alert('Score needs to be integer');
      return;
    }
    else if (+score < 0){
      alert('Score cannot be negative');
      return;
    }
    if (isNaN(+total) || score == ''){
      alert('Total score needs to be integer');
      return;
    }
    else if (+total < +score){
      alert('Total score is less than obtained score');
      return;
    }
    dict.score[0] = score;
    dict.score[1] = total;
    this.activestudent.items.push(dict);
    (<HTMLInputElement>document.getElementById("title")).value = '';
    (<HTMLInputElement>document.getElementById("descriptionbox")).value = '';
    (<HTMLInputElement>document.getElementById("dateofactivity")).value = '';
    (<HTMLInputElement>document.getElementById("scored")).value = '';
    (<HTMLInputElement>document.getElementById("total")).value = '';
    (<HTMLInputElement>document.getElementById("activity")).value = '0';

    this.ms.close(id);
  }

  operatechange(k: any) {
    if (k[0] != 0) {
      this.changestudent(k[0] - 1);
      this.changewindow(k[1]);
    }
  }

  changestudent(s: number) {
    this.activestudent = this.students[s];
    this.activestudentid = s;
  }

  changewindow(s: number) {
    if (s == 1 && this.activestudent != 0) {
      this.activewindow = 'profile';
      this.setprofile();
      this.setdata();
      this.gebcalculate();
    }
    else if (s == 2 && this.activestudent != 0) {
      this.activewindow = 'data';
      this.setprofile();
      this.setdata();
      this.gebcalculate();
    }
    else if (s == 3 && this.activestudent != 0) {
      this.activewindow = 'evaluation';
      this.setprofile();
      this.setdata();
      this.gebcalculate();
    }
  }

  name: string = '';
  email: string = '';
  gender: number = -1;
  items: any;

  setprofile() {
    this.name = this.activestudent.name;
    this.email = this.activestudent.email;
    this.gender = this.activestudent.gender;

    (<HTMLInputElement>document.getElementById("Name")).value = this.name;
    (<HTMLInputElement>document.getElementById("Email")).value = this.email;


  }

  setdata() {
    this.items = this.activestudent.items;
  }

  daysgone(date: string) {
    let startdate = new Date(date);
    let today = new Date();
    return Math.ceil((today.getTime() - startdate.getTime()) / (1000 * 60 * 60 * 24)) - 1;
  }

  profile_operate() {
    this.profile_edit = !this.profile_edit;
    if (!this.profile_edit) {
      this.button_text = 'Edit';
      this.name = (<HTMLInputElement>document.getElementById("Name")).value;
      this.email = (<HTMLInputElement>document.getElementById("Email")).value;
      var genderradios = document.getElementsByName('GenderRadio');
      for (var i = 0; i < 2; i++) {
        var b = <HTMLInputElement>genderradios.item(i);
        if (b.checked) {
          this.gender = i;
        }
      }
      this.students[this.activestudentid].name = this.name;
      this.students[this.activestudentid].email = this.email;
      this.students[this.activestudentid].gender = this.gender;
    }
    else {
      this.button_text = 'Save Changes';
    }
  }

  deleteitem(i: number) {
    this.activestudent.items.splice(i, 1);
  }

  environment_knowledge: number = 0;
  connectness: number = 0;
  present_geb: number = 0;
  previous_geb: number = 0;
  increase: number = 0;
  visits: number = 0;
  test_undertaken: number = 0;
  test_score: number = 0;
  month: string = '';
  year: number = 0;
  eca_score: number = 0;
  ecas: number = 0;
  activities: number = 0;

  annual_environment_knowledge: number = 0;
  annual_connectness: number = 0;
  annual_present_geb: number = 0;
  annual_previous_geb: number = 0;
  annual_increase: number = 0;
  annual_visits: number = 0;
  annual_test_undertaken: number = 0;
  annual_test_score: number = 0;
  annual_eca_score: number = 0;
  annual_ecas: number = 0;
  annual_activities: number = 0;

  annualgebcalculate() {
    var visit = 0;
    var prev_visit = 0;
    var date = new Date();
    this.year = date.getFullYear();
    this.annual_visits = 0;
    this.annual_test_undertaken = 0;
    this.annual_test_score = 0;
    this.annual_eca_score = 0;
    this.annual_ecas = 0;
    this.annual_activities = 0;
    this.annual_environment_knowledge = 0;
    this.annual_connectness = 0;
    this.annual_present_geb = 0;
    this.annual_previous_geb = 0;
    this.annual_increase = 0;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].header == 'Excursion' && this.year == parseInt(this.items[i].date.slice(6), 10)) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        visit += score / total;
        this.annual_visits += 1;
        this.annual_activities += 1;
      }
      else if (this.items[i].header == 'Excursion' && (this.year - 1) == parseInt(this.items[i].date.slice(6), 10)) {
        let prev_score = parseFloat(this.items[i].score[0]);
        let prev_total = parseFloat(this.items[i].score[1]);
        prev_visit = prev_score / prev_total;
      }
      else if (this.items[i].header == 'Knowledge Check' && this.year == parseInt(this.items[i].date.slice(6), 10)) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        this.annual_test_score += score / total;
        this.annual_test_undertaken += 1;
        this.annual_activities += 1;
      }
      else if (this.items[i].header == 'Extra-Curriculum Activity' && this.year == parseInt(this.items[i].date.slice(6), 10)) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        this.annual_eca_score += score / total;
        this.annual_ecas += 1;
        this.annual_activities += 1;
      }
    }
    this.annual_environment_knowledge = (visit + this.annual_test_score) * 0.26 + 0.93;
    this.annual_connectness = (visit) * 0.29 + 0.92;
    this.annual_present_geb = (this.annual_environment_knowledge * 0.13 + this.annual_connectness * 0.83 + 0.28) * 0.87 + 0.24;
    this.annual_previous_geb = ((prev_visit * 0.26 + 0.93) * 0.13 + (prev_visit * 0.29 + 0.92) * 0.83 + 0.28) * 0.87 + 0.24;
    this.annual_increase = (this.annual_present_geb - this.annual_previous_geb) * 100 / this.annual_previous_geb;
  }

  gebcalculate() {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var visit = 0;
    var prev_visit = 0;
    var date = new Date();
    var month = date.getMonth() + 1;
    this.month = monthNames[month - 1];
    this.year = date.getFullYear();
    this.visits = 0;
    this.test_undertaken = 0;
    this.test_score = 0;
    this.eca_score = 0;
    this.ecas = 0;
    this.activities = 0;
    this.environment_knowledge = 0;
    this.connectness = 0;
    this.present_geb = 0;
    this.previous_geb = 0;
    this.increase = 0;
    var prev_month = month;
    var prev_month_year = this.year;
    if ( month == 1 ){
      prev_month = 12;
      prev_month_year = this.year - 1;
    }
    else{
      prev_month -= 1;
    }

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].header == 'Excursion' && ( month == parseInt(this.items[i].date.slice(0, 2), 10) ) && ( this.year == parseInt(this.items[i].date.slice(6), 10) ) ) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        visit += score / total;
        this.visits += 1;
        this.activities += 1;
      }
      else if (this.items[i].header == 'Excursion' && prev_month == parseInt(this.items[i].date.slice(0, 2), 10) && prev_month_year == parseInt(this.items[i].date.slice(6), 10) ) {
        let prev_score = parseFloat(this.items[i].score[0]);
        let prev_total = parseFloat(this.items[i].score[1]);
        prev_visit += prev_score / prev_total;
        console.log('Previous month excursion found.');
      }
      else if (this.items[i].header == 'Knowledge Check' && ( month == parseInt(this.items[i].date.slice(0, 2), 10) ) && ( this.year == parseInt(this.items[i].date.slice(6), 10) )) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        this.test_score += score / total;
        this.test_undertaken += 1;
        this.activities += 1;
      }
      else if (this.items[i].header == 'Extra-Curriculum Activity' && ( month == parseInt(this.items[i].date.slice(0, 2), 10) ) && ( this.year == parseInt(this.items[i].date.slice(6), 10) )) {
        let score = parseFloat(this.items[i].score[0]);
        let total = parseFloat(this.items[i].score[1]);
        this.eca_score += score / total;
        this.ecas += 1;
        this.activities += 1;
      }
    }
    this.environment_knowledge = (visit + this.test_score) * 0.26 + 0.93;
    this.connectness = (visit) * 0.29 + 0.92;
    this.present_geb = (this.environment_knowledge * 0.13 + this.connectness * 0.83 + 0.28) * 0.87 + 0.24;
    this.previous_geb = ((prev_visit * 0.26 + 0.93) * 0.13 + (prev_visit * 0.29 + 0.92) * 0.83 + 0.28) * 0.87 + 0.24;
    this.increase = (this.present_geb - this.previous_geb) * 100 / this.previous_geb;
    this.annualgebcalculate();
  }
}
