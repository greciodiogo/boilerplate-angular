import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { Saver, SAVER } from '@app/shared/services/saver.provider';
import { download, Download, ignoreNotFound } from 'ngx-operators';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

class AnexoFile {
  id: number;
  filename: string;
}
@Component({
  selector: 'button-download',
  templateUrl: './button-download.component.html',
  styleUrls: ['./button-download.component.css'],
})
export class ButtonDownloadComponent implements OnInit {
  @Input() anexo: AnexoFile = new AnexoFile();
  @Input() anexoDownload: AnexoFile = new AnexoFile();
  @Input() url: string = `anexos/attachment`;
  @Input() title: string = `Download`;



  download$: Observable<Download>;

  constructor(private http: ApiService, @Inject(SAVER) private save: Saver) {}

  ngOnInit(): void {}

  download() {
    this.anexoDownload = this.anexo;
    var _count = true;
    const urlServer = this.url;
    this.download$ = this.http.file(urlServer, { filename: this.anexo.filename })
      .pipe(ignoreNotFound(),
        download((blob) => {
          if (_count) this.save(blob, this.anexo.filename);
        }),
        finalize(() => {
          _count = false;
        })
      );
  }
}
