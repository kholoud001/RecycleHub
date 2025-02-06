import { createSelector } from '@ngrx/store';
import { PointsState } from './point-system.reducer';

export const selectPointsState = (state: any) => state.pointSystem;

export const selectTotalPoints = createSelector(
  selectPointsState,
  (state: PointsState) => state.total
);
