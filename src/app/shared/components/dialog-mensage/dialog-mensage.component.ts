import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dialog-mensage',
  templateUrl: './dialog-mensage.component.html',
  styleUrls: ['./dialog-mensage.component.css']
})
export class DialogMensageComponent implements OnInit {

  @Input() display:boolean
  @Input() msgContent: string
  @Output() fechaDialogo = new EventEmitter()

  fecharDialogo(){
    this.display = false
    this.fechaDialogo.emit(this.display)
  }
 

  constructor() { }

  ngOnInit() {
  }

}
