import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointState } from './point.reducer';

export const selectPointState = createFeatureSelector<PointState>('points');

export const selectPointsByRequestId = (requestId: number) =>
  createSelector(
    selectPointState,
    (state) => state.pointsByRequestId[requestId] || 0
  );


