import { createAction, props } from '@ngrx/store';

export const addPlastiquePoints = createAction(
  '[PointSystem] Add Plastique',
  props<{ kg: number }>()
);

export const addVerrePoints = createAction(
  '[PointSystem] Add Verre',
  props<{ kg: number }>()
);

export const addPapierPoints = createAction(
  '[PointSystem] Add Papier',
  props<{ kg: number }>()
);

export const addMetalPoints = createAction(
  '[PointSystem] Add Métal',
  props<{ kg: number }>()
);

export const calculateTotalPoints = createAction(
  '[PointSystem] Calculate Total Points'
);
