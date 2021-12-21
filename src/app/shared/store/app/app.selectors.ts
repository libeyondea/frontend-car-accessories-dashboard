import { createSelector } from '@ngrx/store';
import { RootState } from '..';

import { AppState } from './app.reducers';

export const selectApp = (state: RootState) => state.appState;

export const selectSidebarApp = createSelector(
	selectApp,
	(state: AppState) => state.sidebar
);
