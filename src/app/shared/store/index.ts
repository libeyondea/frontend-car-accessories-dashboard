import { authReducer, AuthState } from './auth/auth.reducers';
import { AuthEffects } from './auth/auth.effects';
import { appReducer, AppState } from './app/app.reducers';
import { AppEffects } from './app/app.effects';

export interface RootState {
	authState: AuthState;
	appState: AppState;
}

export const rootReducers = {
	authState: authReducer,
	appState: appReducer,
};

export const rootEffects = [AuthEffects, AppEffects];
