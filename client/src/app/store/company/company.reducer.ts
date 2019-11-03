import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as companyActions from './company.actions';
import { CompanyState } from '@app/store/states';

export const initialState: CompanyState = {
    companies: null,
};

export const companyReducer = createReducer(
    initialState,
    on(companyActions.getCompaniesSuccess, (state, res) => ({
        ...state, companies: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(companyActions.postCompanySuccess, (state, res) => ({
        ...state, companies: [...state.companies, res]
    })),
    on(companyActions.postCompanyEditSuccess, (state, res) => {
        const companies = [...state.companies];
        const index = companies.findIndex(m => m.id == res.id);
        companies[index] = res;
        return ({
            ...state, companies
        });
    }),
    on(companyActions.deleteCompanySuccess, (state, res) => {
        const companies = [...state.companies];
        const index = companies.findIndex(m => m.id == res.id);
        companies.splice(index, 1);
        return ({
            ...state, companies
        });
    }),
);

export const getCompanyState = createFeatureSelector<CompanyState>('companyState');