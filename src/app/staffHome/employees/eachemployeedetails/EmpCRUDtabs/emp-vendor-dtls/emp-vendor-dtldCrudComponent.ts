/**
 * Created by venka on 12/24/2016.
 */
import {Component, Output,EventEmitter} from "@angular/core"
@Component({
  selector: 'empven-crudOperations',
  templateUrl:'./emp-ven-dtldCrudComponent.html'
})
export class EmpVenCrudComponent{
@Output() Crud = new EventEmitter();
onClick(event){
  this.Crud.emit(event);
}
}
