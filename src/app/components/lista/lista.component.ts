import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/list.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  constructor(private deseosService: DeseosService,
              private route: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    console.log(lista);
    this.route.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
  }

  async editar(lista: Lista){
    
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Ingrese titulo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Editar',
          handler: (data) => {
            console.log(data.titulo);
            if(data.titulo == ''){
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage
          }  
        }
      ]
    });
    alert.present(); 
  }

}
