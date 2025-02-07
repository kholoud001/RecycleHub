import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointState } from './point.reducer';

export const selectPointState = createFeatureSelector<PointState>('points');

export const selectPointsByRequestIdAndUserId = (requestId: number, userId: number) =>
  createSelector(
    selectPointState,
    (state) => state.pointsByRequestIdAndUserId[requestId]?.[userId] || 0
  );




