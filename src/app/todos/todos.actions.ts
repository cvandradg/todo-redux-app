import { createAction, props } from '@ngrx/store';

export const limpiar = createAction('[TODO] Limpiar ToDo');

export const crear = createAction(
  '[TODO] Crear ToDo',
  props<{ text: string }>()
);

export const toggle = createAction(
  '[TODO] Toggle ToDo',
  props<{ id: number }>()
);

export const editar = createAction(
  '[TODO] Editar ToDo',
  props<{ id: number, text: string }>()
);

export const borrar = createAction(
  '[TODO] Borrar ToDo',
  props<{ id: number }>()
);

export const toggleAll = createAction(
  '[TODO] Complear ToDo',
  props<{ completado: boolean }>()
);