
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface List{
  name:string;
  id:number;
}
export class Data{
  file: File = null;
  type:number = null;
  expiration:Date = null;
}
export class Configs{
    labelItem: string;
    labelFile:string;
    labelDate:string;
    requerExpirationDate:boolean = true;
    requerTypeAnexo:boolean = true;
}
@Component({
  selector: 'app-button-file-upload',
  templateUrl: './button-file-upload.component.html',
  styleUrls: ['./button-file-upload.component.css'],
})
export class ButtonFileUploadComponent {

  @Output() onChangeFile = new EventEmitter<any>();
  @Output() onChangeType = new EventEmitter<any>();
  @Output() onChangeExpiration = new EventEmitter<any>();
  @Output() imageBase64 = new EventEmitter<any>();

  @Input() Config: Configs = new Configs();

  @Output() onChangeData = new EventEmitter<Data>();

  public data:Data = new Data();

  @Input() items: List[] = [];
  @Input() textMsg:string="";
  @Input() formats: any[]=["pdf", "jpeg", "png","JPG","jpg","PNG", "pptx","xlsx", "docx", "rsp"];

  public formartValid:boolean = true;

  public formImport: FormGroup;
  public fileToUpload: File = null;

  isCompleted: boolean = false;

  constructor() {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required),
      tipoAnexo: new FormControl(''),
      data_validade: new FormControl('')
    });
    this.Config.labelItem= 'Tipo de documento'
    this.Config.labelFile= 'Arquivo'
    this.Config.labelDate= 'Data de Validade';
    this.Config.requerExpirationDate = true
  }

  onFileChange(files: FileList) {
    if(files.length > 0){
        const format = this.reverse(this.reverse(files.item(0).name).split(".")[0]);
        this.formartValid = this.formats.find((f) =>f === format)==undefined?false:true;
        this.textMsg = !this.formartValid?"O formato do arquivo '"+ format +"' é invalido":"";
    }
    if (files.length > 0 && this.formartValid) {
      this.isCompleted = true;
      this.fileToUpload = files.item(0);
      this.data.file = this.fileToUpload;
      this.onChangeData.emit(this.data);
      this.onChangeFile.emit(this.fileToUpload);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const fileConvertedToBase64Path = event?.target?.result;
        files.item(0)['base64'] = fileConvertedToBase64Path;
        this.imageBase64.emit(fileConvertedToBase64Path)
        this.isCompleted = false;
      };
      reader.readAsDataURL(files.item(0));
    }else{
      this.fileToUpload = null;
      this.onChangeFile.emit(FileList);
      this.isCompleted = false;
    }
    if(this.items.length==1){
      this.data.type = this.items[0].id
      this.onChangeType.emit(this.items[0].id);
    }

  }

  onChangeTipoAnexo(tipoAnexo) {
    this.data.type = tipoAnexo.target.value;
    this.onChangeData.emit(this.data);
    this.onChangeType.emit(tipoAnexo?.target?.value);
  }

  onChangeDataValidade(data){
    this.data.expiration = data?.target?.value;
    this.onChangeData.emit(this.data);
    this.onChangeType.emit(data?.target?.value);
  }

   reverse(s:string):string {
    return (s === '') ? '' : this.reverse(s.substr(1)) + s.charAt(0);
  }

}
