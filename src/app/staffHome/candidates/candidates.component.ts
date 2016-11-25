import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/components/common/api';
@Component({
  selector   : 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls  : ['./candidates.component.css']
})
export class CandidatesComponent {
  candidateTableTypes: SelectItem[];
  selectedTableType: string;

  constructor() {
    this.candidateTableTypes = [];
    this.candidateTableTypes.push({label: 'All Open Candidates', value: 'AllOpenCandidates'});
    this.candidateTableTypes.push({label: 'Hot Candidates', value: 'HotCandidates'});
    this.candidateTableTypes.push({label: 'Screened Candidates', value: 'ScreenedCandidates'});
  }


}
