import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';
import { DeseosService } from '../services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista; 
  nombreItem: '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute ){ 

    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista= this.deseosService.obtenerLista( listaId );

  }

  ngOnInit() {
  }

  agregarItem(){
    if ( this.nombreItem.length === 0 ){
      return;
    }
    const nuevoItem = new listaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem= '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: listaItem ){
    // retorna un arrelo con todos los items que estan pendientes
    const pendientes= this.lista.items.filter( itemData =>!itemData.completado )
                      .length;
    if (pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
    console.log(this.deseosService.listas)
  }

  borrar (i: number){
    this.lista.items.splice( i,1);
    this.deseosService.guardarStorage();
  }

}
