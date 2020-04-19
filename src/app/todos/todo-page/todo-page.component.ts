import { Component, OnInit } from '@angular/core';
import { appState } from '../../appState.reducer';
import { Store } from '@ngrx/store';
import { toggleAll } from '../todos.actions';


@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  completados = false;

  constructor(private store: Store<appState>) { }

  ngOnInit(): void {
  }

  toggleAll(){
    this.completados = !this.completados

    this.store.dispatch(toggleAll({completado: this.completados}));
  }



}
