import { createAction, props } from '@ngrx/store';

export const addPoints = createAction(
  '[Point System] Add Points',
  props<{ requestId: number; userId: number; points: number }>()
);

