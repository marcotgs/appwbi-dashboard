import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as sectorActions from './sector.actions';
import { SectorState } from '@app/store/states';

export const initialState: SectorState = {
    sectors: null,
};

export const sectorReducer = createReducer(
    initialState,
    on(sectorActions.getSectorSuccess, (state, res) => ({
        ...state, sectors: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(sectorActions.postSectorSuccess, (state, res) => ({
        ...state, sectors: [...state.sectors, res]
    })),
    on(sectorActions.postSectorEditSuccess, (state, res) => {
        const sectors = [...state.sectors];
        const index = sectors.findIndex(m => m.id == res.id);
        sectors[index] = res;
        return ({
            ...state, sectors
        });
    }),
    on(sectorActions.deleteSectorSuccess, (state, res) => {
        const sectors = [...state.sectors];
        const index = sectors.findIndex(m => m.id == res.id);
        sectors.splice(index, 1);
        return ({
            ...state, sectors
        });
    }),
);

export const getSectorState = createFeatureSelector<SectorState>('sectorState');