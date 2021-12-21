import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as appActions from './app.actions';

@Injectable()
export class AppEffects {
	constructor(private actions$: Actions) {}

	sidebarApp$ = createEffect(() =>
		this.actions$.pipe(
			ofType(appActions.sidebarAppRequested),
			map((action) =>
				appActions.sidebarAppSucceed(action.payload.sidebar)
			)
		)
	);
}
