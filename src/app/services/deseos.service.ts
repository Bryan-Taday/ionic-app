import { Injectable } from '@angular/core';
import { Lista } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }
  
  crearLista(titulo: string){
    const lista = new Lista(titulo);
    this.listas.push(lista);
    this.guardarStorage();
    return lista.id;
  }

  cargarLista(id: string | number){
    id = Number(id);
    return this.listas.find( listaData => {
      return listaData.id === id;
    })
  }

  guardarStorage(){
    localStorage.setItem('lista', JSON.stringify(this.listas));
  }

  cargarStorage(){
    let listaString = localStorage.getItem('lista');
    if(listaString != null){
      this.listas = JSON.parse(listaString);
    }
  }
}
