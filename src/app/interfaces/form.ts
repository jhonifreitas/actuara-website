import { FormArray as AGFormArray, FormControl } from "@angular/forms";

export class FormArray extends AGFormArray {
  controls: FormControl[] = [];
}