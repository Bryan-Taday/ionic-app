import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/list.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = []
  constructor(public servicio: DeseosService,
              private route: Router,
              private alertCtrl: AlertController ) {
    this.listas = servicio.listas;
  }

  async irAgregar(){
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Formulario',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Ingrese titulo'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Crear',
            handler: (data) => {
              console.log(data.titulo);
              if(data.titulo == ''){
                return;
              }
              const id = this.servicio.crearLista(data.titulo);
              this.route.navigateByUrl(`tabs/tab1/agregar/${id}`);
            }  
          }
        ]
      });
      alert.present(); 
  }

}
