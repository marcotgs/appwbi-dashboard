import { MenuPermissionsResponse, PermissionResponse } from "@shared/interfaces";

export interface AccessPermissionState {
    menuPermissions?: MenuPermissionsResponse[];
    permissions?: PermissionResponse[];
}