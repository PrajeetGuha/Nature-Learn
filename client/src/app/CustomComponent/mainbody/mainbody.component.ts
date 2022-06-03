import { Component, OnInit } from '@angular/core'
import { about, instructions } from './Text'
import { DataService } from '../navbar/data.service';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})
export class MainbodyComponent implements OnInit {

  about_text : any = about;
  instruction_text : any = instructions;

  title : string = about.title;
  description : string = about.description;
  test : number = 0;

  constructor(private ds : DataService) {
    this.ds.callToggle.subscribe((data)=>{this.trigger(data)})
   }

  ngOnInit(): void {
  }
  trigger(check : any){
    if ( check == 1 ){
      this.title = this.about_text.title;
      this.description = this.about_text.description;
      this.test = 0;
    }
    else if ( check == 2 ){
      this.title = this.instruction_text.title;
      this.description = this.instruction_text.description;
      this.test = 0;
    }
    else if ( check == 3 ){
      this.test = 1;
    }
  }

}
