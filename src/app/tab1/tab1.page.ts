import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { Lista } from '../models/lista.model';
import { DeseosService } from '../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService:DeseosService,
              private router : Router,
              private alertCtrl: AlertController) {
  }

  async agregarLista(){
    
    const alert =await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs:[{
        name:'titulo',
        type:'text',
        placeholder:'Nombre de la lista'
      }],
      buttons: [{
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          console.log('Cancelar');
        }
      },{
        text:'Crear',
        handler:(data)=>{
          console.log(data);
          if ( data.titulo == ""){
            return;
          }

          const listaId = this.deseosService.crearLista(data.titulo);

          // Tengo que crear la lista
          this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
        }
    }]
    });

    alert.present();

  }

  // listaSeleccionada( lista: Lista ){
  //   console.log(lista);
  //   // asignamos una accion al hacer click en la tarea, en este caso nos direcciona a la agina de los items 
  //   this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
  // }
  
}
