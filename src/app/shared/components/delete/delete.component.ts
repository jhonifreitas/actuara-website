import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DeleteComponent>,
  ) {
    this.formGroup = this.formBuilder.group({
      confirm: new FormControl('', [Validators.required, this.validatorConfirm]),
    });
  }

  ngOnInit(): void { }

  validatorConfirm(confirm: FormControl): {invalid: boolean} {
    let result: any = null;
    if (confirm.value !== 'SIM') result = {invalid: true};
    return result;
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}
