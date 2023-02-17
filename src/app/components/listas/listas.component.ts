import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) lista : IonList;
  @Input() terminada: boolean = true;

  constructor(public deseosServices: DeseosService,
              private router:Router ,
              private ref: ChangeDetectorRef,
              private alertCtrl: AlertController ){};

  ngOnInit() {}

  listaSeleccionada( lista: Lista ){
    // console.log( lista );
    if (this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista:Lista ){
    this.deseosServices.borrarLista( lista);
    this.ref.detectChanges(); 
    console.log('La lista se borro correctamente');
  }

  async editarLista( lista: Lista ){

    const alert =await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs:[{
        name:'titulo',
        type:'text',
        value: lista.titulo ,
        placeholder:'Nombre de la lista'
      }],
      buttons: [{
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          console.log('Cancelar');
          this.lista.closeSlidingItems();
          
        }
      },{
        text:'Actualizar',
        handler:(data)=>{
          console.log(data);
          if ( data.titulo.length== 0){
            return;
          }

          lista.titulo = data.titulo;
          this.deseosServices.guardarStorage();
          this.lista.closeSlidingItems();
        }
    }]
    });

    alert.present();
  }

}
