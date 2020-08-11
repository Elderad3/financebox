import { Message } from 'primeng/api';
import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html'
})
export class PageContainerComponent implements OnInit {

  @Input() titulo: string


  constructor() {
  }

  ngOnInit() {
  }
}
