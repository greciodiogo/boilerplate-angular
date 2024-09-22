import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { NavComponent } from './nav/nav.component';
 @NgModule({
    imports: [CommonModule, RouterModule],
    exports: [SidebarComponent],
    declarations: [SidebarComponent, NavComponent]
})
export class SidebarModule {}
