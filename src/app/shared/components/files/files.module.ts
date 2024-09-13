import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFileComponent } from './open-file/open-file.component';
import { LoadingModule } from '../loading/loading.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FileRejeitarComponent } from './file-rejeitar/file-rejeitar.component';



@NgModule({
  declarations: [OpenFileComponent, FileRejeitarComponent],
  imports: [
    CommonModule,
    LoadingModule,
    SharedGlobalModule,
    SharedMaterialModule,
  ],exports: [OpenFileComponent]
})
export class FilesModule { }
