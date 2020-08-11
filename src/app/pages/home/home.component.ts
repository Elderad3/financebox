
import { Component, OnInit } from '@angular/core';
import * as  p from 'node_modules/@guiseek/ofx2json/lib/ofx2json.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titulo: string = "Início"

  constructor() { }


  ngOnInit() {

  }
}
