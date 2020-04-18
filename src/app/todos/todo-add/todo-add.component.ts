import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appState } from '../../appState.reducer';
import * as action from '../todos.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  textInput: FormControl;

  constructor(private store: Store<appState> ) {
    this.textInput = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  agregar(){
    if ( this.textInput.invalid ) {
      return;
    }

    this.store.dispatch( action.crear({text: this.textInput.value}) );

    this.textInput.reset();

  }
}

