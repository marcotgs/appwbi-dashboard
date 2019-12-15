import { props, createAction } from '@ngrx/store';
import * as sectorTypes from "./sector.types";
import {
    ApiResponseErrors, SectorBody, SectorResponse,
} from '@shared/interfaces';

export const getSector = createAction(
    sectorTypes.GET_SECTOR,
    props<{ companyId?: number }>(),
);

export const getSectorSuccess = createAction(
    sectorTypes.GET_SECTOR_SUCCESS,
    props<SectorResponse[]>()
);

export const getSectorError = createAction(
    sectorTypes.GET_SECTOR_ERROR,
    props<ApiResponseErrors>()
);

export const postSector = createAction(
    sectorTypes.POST_SECTOR,
    props<SectorBody>(),
);

export const postSectorSuccess = createAction(
    sectorTypes.POST_SECTOR_SUCCESS,
    props<SectorResponse>()
);

export const postSectorEditSuccess = createAction(
    sectorTypes.POST_EDIT_SECTOR_SUCCESS,
    props<SectorResponse>()
);

export const postSectorError = createAction(
    sectorTypes.POST_SECTOR_ERROR,
    props<ApiResponseErrors>()
);

export const deleteSector = createAction(
    sectorTypes.DELETE_SECTOR,
    props<{ id: number }>(),
);

export const deleteSectorSuccess = createAction(
    sectorTypes.DELETE_SECTOR_SUCCESS,
    props<{ id: number }>(),
);

export const deleteSectorError = createAction(
    sectorTypes.DELETE_SECTOR_ERROR,
    props<ApiResponseErrors>()
);
