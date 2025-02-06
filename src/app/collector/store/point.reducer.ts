import { createReducer, on } from '@ngrx/store';
import { addPoints } from './point.actions';

export interface PointState {
  pointsByRequestId: { [key: number]: number };
}

export const initialState: PointState = {
  pointsByRequestId: {},
};

export const pointReducer = createReducer(
  initialState,
  on(addPoints, (state, { requestId, points }) => {
    return {
      ...state,
      pointsByRequestId: {
        ...state.pointsByRequestId,
        [requestId]: points,
      },
    };
  })
);
