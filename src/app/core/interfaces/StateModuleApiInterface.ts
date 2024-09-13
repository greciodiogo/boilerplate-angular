import { HttpParams } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

export interface StateModuleApiInterface{ 

  list(search?: string, filters?: HttpParams): any;
  
  show(id: number): any;
  
  store(form: FormGroup, id): any;

  update(form: FormGroup, id): any;

  delete(id: number): void;

}
