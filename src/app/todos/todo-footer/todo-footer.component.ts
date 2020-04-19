import { Component, OnInit } from '@angular/core';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { Store } from '@ngrx/store';
import { appState } from '../../appState.reducer';
import { limpiar } from '../todos.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados', 'pedientes'];

  pendientes = 0;

  constructor(private store: Store<appState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro);
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;

      this.pendientes = state.todos.filter( todo => !todo.completado).length;
    });
  }

  cambiarFiltro( filtro: filtrosValidos){
      this.filtroActual = filtro;

      this.store.dispatch( setFiltro({filtro}));
  }

  limpiarCompletados() {
    this.store.dispatch(  limpiar() )
  }

}
