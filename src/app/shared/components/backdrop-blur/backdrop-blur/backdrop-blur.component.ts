import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-backdrop-blur',
  templateUrl: './backdrop-blur.component.html',
  styleUrls: ['./backdrop-blur.component.css'],
})
export class BackdropBlurComponent implements OnInit {
  
  @Input() message: string = '';
  
  constructor() {}

  ngOnInit(): void {}
}
