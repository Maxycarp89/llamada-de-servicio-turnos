import { createAction } from "@ngrx/store";

export const showLoading = createAction("[loading] show");
export const hideLoading = createAction("[loading] hide");