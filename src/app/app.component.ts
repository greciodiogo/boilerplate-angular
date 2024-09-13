import { Compiler, Component } from '@angular/core';
import { AppVersion } from '@env/version';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unig4 telco';

  constructor(private compiler: Compiler){
    this.compiler.clearCache();
    if (localStorage.getItem('version') === null) {
      localStorage['version'] = AppVersion.Version;
      window.location.reload();
  } else {
    if (AppVersion.Version !== localStorage.getItem('version')) {
      localStorage['version'] = AppVersion.Version;
      location.reload();
    }
  }
  }
}
