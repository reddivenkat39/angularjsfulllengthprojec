import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-emp-bread-crumbs',
  templateUrl: './emp-bread-crumbs.component.html',
  styleUrls: ['./emp-bread-crumbs.component.css']
})
export class EmpBreadCrumbsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onClick(){
    this.router.navigate(['/employees']);
  }
}
