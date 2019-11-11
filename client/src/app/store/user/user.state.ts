import { UserResponse, ApiResponseErrors } from "@shared/interfaces";

export interface UserState {
    currentUser?: UserResponse
    users?: UserResponse[],
    apiErrors?: ApiResponseErrors,
}