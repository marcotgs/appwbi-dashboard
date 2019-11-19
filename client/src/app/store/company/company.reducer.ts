import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as companyActions from './company.actions';
import { CompanyState } from '@app/store/states';

export const initialState: CompanyState = {
    companies: null,
    segments: null,
    apiErrors: null,
};

export const companyReducer = createReducer(
    initialState,
    on(companyActions.getCompaniesSuccess, (state, res) => ({
        ...state, companies: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, []),
        apiErrors: null,
    })),
    on(companyActions.getSegmentsSuccess, (state, res) => ({
        ...state, segments: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, []),
        apiErrors: null,
    })),
    on(companyActions.postCompanySuccess, (state, res) => ({
        ...state, companies: [...state.companies, res],
        apiErrors: null,
    })),
    on(companyActions.postCompanyEditSuccess, (state, res) => {
        const companies = [...state.companies];
        const index = companies.findIndex(m => m.id == res.id);
        companies[index] = res;
        return ({
            ...state, companies,
            apiErrors: null,
        });
    }),
    on(companyActions.deleteCompanySuccess, (state, res) => {
        const companies = [...state.companies];
        const index = companies.findIndex(m => m.id == res.id);
        companies.splice(index, 1);
        return ({
            ...state, companies,
            apiErrors: null,
        });
    }),
    on(companyActions.deleteCompanyError, (state, res) => {
        return ({
            ...state, apiErrors: res,
        });
    }),
);

export const getCompanyState = createFeatureSelector<CompanyState>('companyState');