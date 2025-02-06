import { createReducer, on } from '@ngrx/store';
import {
  addPlastiquePoints,
  addVerrePoints,
  addPapierPoints,
  addMetalPoints,
  calculateTotalPoints
} from './point-system.actions';

export interface PointsState {
  plastique: number;
  verre: number;
  papier: number;
  metal: number;
  total: number;
}

export const initialPointsState: PointsState = {
  plastique: 0,
  verre: 0,
  papier: 0,
  metal: 0,
  total: 0
};

export const pointSystemReducer = createReducer(
  initialPointsState,
  on(addPlastiquePoints, (state, { kg }) => ({
    ...state,
    plastique: state.plastique + kg * 2
  })),
  on(addVerrePoints, (state, { kg }) => ({
    ...state,
    verre: state.verre + kg * 1
  })),
  on(addPapierPoints, (state, { kg }) => ({
    ...state,
    papier: state.papier + kg * 1
  })),
  on(addMetalPoints, (state, { kg }) => ({
    ...state,
    metal: state.metal + kg * 5
  })),
  on(calculateTotalPoints, (state) => ({
    ...state,
    total: state.plastique + state.verre + state.papier + state.metal
  }))
);
