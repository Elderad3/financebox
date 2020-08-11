import { FormControl, NgModel, FormControlName } from '@angular/forms';
import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'validate ',
  template: `
  <p-message *ngIf="hasError()" severity="error" [text]="text"></p-message>
  <!-- <p-message *ngIf="hasSuccess()" severity="success" text="ok"></p-message> -->
`
})
export class MensagensComponent {

  @Input() text: string
  @Input() error: string
  @Input() control: FormControl

  constructor() { }

  ngOnInit() {
  }

  hasSuccess(): boolean {
    return this.control.valid && (this.control.dirty || this.control.touched)
  }

  hasError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched)
    console.log(this.control)
    // return this.control.hasError(this.error) && this.control.dirty;
  }



}
