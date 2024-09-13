import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuReportingBiComponent } from './menu-reporting-bi/menu-reporting-bi.component';
import { MenusComponent } from './menu-reporting-bi/menus/menus.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [MenuReportingBiComponent, MenusComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuReportingBiComponent],
})
export class CReportingBiModule {}
