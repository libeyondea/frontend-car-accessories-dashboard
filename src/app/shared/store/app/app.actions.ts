import { createAction } from '@ngrx/store';

export enum SideBarAppActionTypes {
	SIDEBAR_APP_REQUESTED = '[App] Sidebar App Requested',
	SIDEBAR_APP_SUCCEED = '[App] Sidebar App Succeed',
}

export const sidebarAppRequested = createAction(
	SideBarAppActionTypes.SIDEBAR_APP_REQUESTED,
	(sidebar) => ({
		payload: {
			sidebar,
		},
	})
);

export const sidebarAppSucceed = createAction(
	SideBarAppActionTypes.SIDEBAR_APP_SUCCEED,
	(sidebar) => ({
		payload: {
			sidebar,
		},
	})
);
