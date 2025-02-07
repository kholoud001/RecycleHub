import { createReducer, on } from '@ngrx/store';
import { addPoints } from './point.actions';

export interface PointState {
  pointsByRequestId: { [key: number]: number };
  pointsByUserId: { [userId: number]: number };

}

const storedState = localStorage.getItem('pointsState');
// export const initialState: PointState = {
//   pointsByRequestId: {},
//   pointsByUserId: {},
// };

export const initialState: PointState = storedState ? JSON.parse(storedState) : { pointsByRequestId: {} };


export const pointReducer = createReducer(
  initialState,
  on(addPoints, (state, { requestId, points }) => {
    const updatedState = {
      ...state,
      pointsByRequestId: {
        ...state.pointsByRequestId,
        [requestId]: points,
      },
    };

    // ✅ Save updated state to LocalStorage
    localStorage.setItem('pointsState', JSON.stringify(updatedState));

    return updatedState;
  })
);
