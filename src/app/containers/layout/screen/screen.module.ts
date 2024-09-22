import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockScreenComponent } from './block-screen/block-screen.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [BlockScreenComponent],
  imports: [
    CommonModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [BlockScreenComponent],
})
export class ScreenModule {}
