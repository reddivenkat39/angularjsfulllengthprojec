import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-row-candidates',
  templateUrl: './select-row-candidates.component.html',
  styleUrls: ['./select-row-candidates.component.css']
})
export class SelectRowCandidatesComponent implements OnInit {
  private marketingTab = false;
  private hrTab = false;
  constructor() { }

  ngOnInit() {
  }
  marketingTabClicked(){
    this.marketingTab=!this.marketingTab;
  }
  hrTabClicked(){
    this.marketingTab=!this.marketingTab;
    this.hrTab=!this.hrTab;

  }
}
