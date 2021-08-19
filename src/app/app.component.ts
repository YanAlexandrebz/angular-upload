import { UploadService } from './services/upload.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  arquivos: File[] = [];//array para guardar os arquivos
  formInvalido = false;//flag para controlar a exibicao do alert
  erroUpload = false;//flag para controlar a exibicao do alert de envio do arquivo
  urlsUpload: string[] = [];//array para armazenar as urls de retorno

  constructor(private UploadService: UploadService){}

  armazenarArquivo($event: any){
    this.arquivos = $event.target.files;
    this.formInvalido = false;
  }
  
  enviarArquivo($event: any){
    //preventDefault() - evita de ficar recarregando a pag a cada clique
    $event.preventDefault();
    //valida se tem algum arquivo para ser enviado
    if (this.arquivos.length == 0){
      this.formInvalido = true;
      return;
    }
    this.erroUpload = false;
    this.UploadService.upload(this.arquivos).subscribe(
      dados => this.urlsUpload = dados as string[], //sucesso
      () => this.erroUpload = true //erro
    );
  
  }

 

}
