import { createReducer, on } from '@ngrx/store';
import { addPoints } from './point.actions';

export interface PointState {
  pointsByRequestIdAndUserId: { [requestId: number]: { [userId: number]: number } };
}


const storedState = localStorage.getItem('pointsState');
export const initialState: PointState = storedState ? JSON.parse(storedState) : { pointsByRequestIdAndUserId: {} };


export const pointReducer = createReducer(
  initialState,
  on(addPoints, (state, { requestId, userId, points }) => {
    const key = `${requestId}-${userId}`;
    const updatedState = {
      ...state,
      pointsByRequestIdAndUserId: {
        ...state.pointsByRequestIdAndUserId,
        [key]: Number(points),
      },
    };

    localStorage.setItem('pointsState', JSON.stringify(updatedState));
    return updatedState;
  })

);

