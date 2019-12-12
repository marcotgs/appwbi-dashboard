import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as companyBranchActions from './company-branch.actions';
import { CompanyBranchState } from '@app/store/states';

export const initialState: CompanyBranchState = {
    companiesBranchs: null,
};

export const companyBranchReducer = createReducer(
    initialState,
    on(companyBranchActions.getCompaniesBranchsSuccess, (state, res) => ({
        ...state, companiesBranchs: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(companyBranchActions.postCompanyBranchSuccess, (state, res) => ({
        ...state, companiesBranchs: [...state.companiesBranchs, res]
    })),
    on(companyBranchActions.postCompanyBranchEditSuccess, (state, res) => {
        const companiesBranchs = [...state.companiesBranchs];
        const index = companiesBranchs.findIndex(m => m.id == res.id);
        companiesBranchs[index] = res;
        return ({
            ...state, companiesBranchs
        });
    }),
    on(companyBranchActions.deleteCompanyBranchSuccess, (state, res) => {
        const companiesBranchs = [...state.companiesBranchs];
        const index = companiesBranchs.findIndex(m => m.id == res.id);
        companiesBranchs.splice(index, 1);
        return ({
            ...state, companiesBranchs
        });
    }),
);

export const getCompanyBranchState = createFeatureSelector<CompanyBranchState>('companyBranchState');