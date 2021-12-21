import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
	constructor(private actions$: Actions) {}

	currentAuth$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authActions.currentAuthRequested),
			map((action) =>
				authActions.currentAuthSucceed(action.payload.current)
			)
		)
	);
}
