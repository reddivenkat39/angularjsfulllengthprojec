import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent implements OnInit {
private employeesButtonClicked = false;
  constructor(private router: Router) { }
  /*public tabs:Array<any> = [
    {title: 'Home', content: 'content 1'},
    {title: 'Employees', content: 'content 2'}
  ];*/
  ngOnInit() {
    // this.employeesButtonClicked=!this.employeesButtonClicked;
  }

  onEmployeeClick(event){
    event.preventDefault();
    this.router.navigateByUrl('/employees');
  }

}
