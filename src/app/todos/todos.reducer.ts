import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiar } from './todos.actions';
import { Todo } from './models/todo.model';


export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del Capitán América'),
];

const _todoReducer = createReducer(estadoInicial,
  on( crear, (state, { text }) => [...state, new Todo( text )  ] ),
  on( limpiar, state => state.filter(todo => !todo.completado)),
  on ( borrar, ( state, { id } ) =>  state.filter( todo => todo.id !== id ) ),
  
  on ( toggleAll, ( state, { completado } ) => state.map( todo => {

    return {
      ...todo,
      completado: completado
    }

  }) ) ,

  on(toggle, (state, { id }) => {
    
    return state.map( todo => {

      if ( todo.id === id  ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }

    });
  }),

  on(editar, (state, { id, text }) => {
    
    return state.map( todo => {

      if ( todo.id === id  ) {
        return {
          ...todo,
          text: text
        }
      } else {
        return todo;
      }

    });
  }),

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}