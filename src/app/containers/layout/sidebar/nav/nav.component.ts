import { Component, Input, OnInit } from '@angular/core';
import { NavInterface } from '../NavInterface';
import { _nav } from '../_nav';
import { Nav , loadtheme} from '@app/containers/layout/themeApp';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  //styleUrls: [env.app=='MOVICEL'? '../../theme/movicel.component.css':'../../theme/at.component.css'],
})
export class NavComponent implements OnInit {
  @Input() NavTheme:Nav;
  @Input() data: NavInterface[] = _nav;

  public menus: Array<NavInterface> = _nav;
  constructor() {}

  ngOnInit(): void {
    // console.log(loadtheme(env.app))

    // if (this.data !== undefined) console.log('data=>', this.data);
  }
}
