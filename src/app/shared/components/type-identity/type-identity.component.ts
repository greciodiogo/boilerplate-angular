import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-identity',
  templateUrl: './type-identity.component.html',
  styleUrls: ['./type-identity.component.css']
})
export class TypeIdentityComponent implements OnInit {

  @Input() items:any=[];
  @Input() name:string;

  constructor() { }

  ngOnInit(): void {
  }

}
