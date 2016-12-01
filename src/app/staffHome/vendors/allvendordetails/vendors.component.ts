import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Vendor} from "../Vendor";
import {VendorsService} from "../vendors.service";

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsComponent implements OnInit {
  private allVendor = false;
  allVendors: Vendor[];
  constructor(private vendorService:VendorsService) { }

  ngOnInit() {
    /*this.vendorService.getAllVendorDetails().subscribe(
      res => {
        console.log("Into get all vendor details method response");
        if (res.datares != null) {
          console.log("yes getting all vendor data ", res.datares);
          this.allVendors = res.datares;
          console.log("term date ...", res.datares);

        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
        }
      }
    );*/
  }
  onClickView(onEachVendorDetail){
    this.allVendor=true;
  }

}
