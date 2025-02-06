import { createAction, props } from '@ngrx/store';

export const addPoints = createAction(
  '[Point System] Add Points',
  props<{ requestId: number; points: number }>()
);

export const loadPoints = createAction(
  '[Points] Load Points',
  props<{ userId: string }>()
);
