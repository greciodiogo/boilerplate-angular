import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/core/security/authentication/auth.service';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-block-screen',
  templateUrl: './block-screen.component.html',
  styleUrls: ['./block-screen.component.css'],
})
export class BlockScreenComponent implements OnInit {
  idleState:number=0// = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  timeout_lock = 'screen';

  public modalRef: BsModalRef;

  @ViewChild('childModal') childModal: ModalDirective;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private auth: AuthService
  ) {

    if (localStorage.getItem(this.timeout_lock) === '1') {
      this.auth.swalRefreshToken();
    }
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(60000);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      //this.idleState = 'No longer idle.'
      //this.idleState = '00';
      this.reset();
      this.stay();
    });
    idle.onTimeout.subscribe(() => {
      if (localStorage.getItem(this.timeout_lock) === '0') {
        localStorage.setItem(this.timeout_lock, '1');
        this.childModal.hide();
        this.timedOut = true;
        this.auth.swalRefreshToken();
        this.reset();
      } else {
        this.stay();
      }
    });

    idle.onIdleStart.subscribe(() => {
      //this.idleState = "You've gone idle!";
      if (localStorage.getItem(this.timeout_lock) === '0') {
        this.childModal.show();
      }
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = countdown //<= 9 ? '0' + countdown : '' + countdown;
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(1000);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.auth.isAuthenticated().subscribe((userLoggedIn) => {
      if (userLoggedIn) {
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });
  }

  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    this.auth.logout();
  }
  ngOnInit(): void { }

  toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        //.filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }
}
