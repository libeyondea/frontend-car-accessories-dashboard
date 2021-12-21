import { createReducer, on } from '@ngrx/store';

import * as appActions from './app.actions';

export const appKey = 'app';

export interface AppState {
	sidebar: boolean;
}

export const initialState: AppState = {
	sidebar: false,
};

export const appReducer = createReducer(
	initialState,
	on(appActions.sidebarAppSucceed, (state, action) => {
		return {
			...state,
			sidebar: action.payload.sidebar,
		};
	})
);
