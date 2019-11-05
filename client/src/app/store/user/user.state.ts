import { UserResponse } from "@shared/interfaces";

export interface UserState {
    currentUser?: UserResponse
    users?: UserResponse[]
}