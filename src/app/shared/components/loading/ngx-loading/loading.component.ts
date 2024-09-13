import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  @Input() show: boolean = true;
  @Input() title?: string = 'Aguarde';
  @Input() subTitle: string = 'A carregar os dados';
  @Input() titleFontSize: number = 28;
  @Input() subTitleFontSize: number = 23;
  public animationTypestionTypes = ngxLoadingAnimationTypes;
  @Input() animationType: string = null;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  @ViewChild('customLoadingTemplate', { static: false })
  public circle = 'circle';
  customLoadingTemplate: TemplateRef<any>;
  constructor() {}
}
