import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/appState.reducer';
import * as action from '../todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') textInputFisico: ElementRef;

  checkCompletado: FormControl;
  textInput: FormControl;

  editando = false;


  constructor(private store: Store<appState>) { }
  
  ngOnInit(): void {
      this.checkCompletado = new FormControl(this.todo.completado);
      this.textInput = new FormControl(this.todo.text, Validators.required);
  
      this.checkCompletado.valueChanges.subscribe(value => {
        this.store.dispatch(action.toggle({id: this.todo.id}));
      });
    }

  editar(){
    this.editando = true;
    this.textInput.setValue( this.todo.text );

    setTimeout(() => {
      this.textInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.textInput.invalid) {
      return;
    }

    if (this.textInput.value === this.todo.text) {
      return;
    }

    this.store.dispatch(
      action.editar({id: this.todo.id, text: this.textInput.value})
    );
  }

  borrar() {
    this.store.dispatch(action.borrar({id: this.todo.id}));
  }

}
