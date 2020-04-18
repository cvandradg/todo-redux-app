import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll } from './todos.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Salvar al mundo2'),
  new Todo('Salvar al mundo3'),
  new Todo('Salvar al mundo4'),

];

const _todoReducer = createReducer(initialState,
  on(crear, (state, {text}) => [...state, new Todo( text )]),

  on(borrar, ( state , { id }) => state.filter( todo => todo.id !== id)),

  on(toggleAll, ( state , { status }) => state.map( todo => {
    return {
      ...todo,
      compleado: status
    };
  })),

  on(toggle, (state, {id}) => {
    return state.map( todo => {

      if (todo.id === id) {

        const todoResult = {
          ...todo,
          completado: !todo.completado
        }

        return todoResult
      }

      return todo;

    });
  }),
  on(editar, (state, {id, text}) => {
    return state.map( todo => {

      if (todo.id === id) {
        return {
          ...todo,
          text
        };
      }

      return todo;

    });
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}


