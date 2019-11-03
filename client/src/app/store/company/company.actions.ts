import { props, createAction } from '@ngrx/store';
import * as companyTypes from "./company.types";
import {
    ApiResponseErrors, CompanyBody, CompanyResponse,
} from '@shared/interfaces';

export const getCompanies = createAction(
    companyTypes.GET_COMPANY
);

export const getCompaniesSuccess = createAction(
    companyTypes.GET_COMPANY_SUCCESS,
    props<CompanyResponse[]>()
);

export const getCompaniesError = createAction(
    companyTypes.GET_COMPANY_ERROR,
    props<ApiResponseErrors>()
);

export const postCompany = createAction(
    companyTypes.POST_COMPANY,
    props<CompanyBody>(),
);

export const postCompanySuccess = createAction(
    companyTypes.POST_COMPANY_SUCCESS,
    props<CompanyResponse>()
);

export const postCompanyEditSuccess = createAction(
    companyTypes.POST_EDIT_COMPANY_SUCCESS,
    props<CompanyResponse>()
);

export const postCompanyError = createAction(
    companyTypes.POST_COMPANY_ERROR,
    props<ApiResponseErrors>()
);

export const deleteCompany = createAction(
    companyTypes.DELETE_COMPANY,
    props<{ id: number }>(),
);

export const deleteCompanySuccess = createAction(
    companyTypes.DELETE_COMPANY_SUCCESS,
    props<{ id: number }>(),
);

export const deleteCompanyError = createAction(
    companyTypes.DELETE_COMPANY_ERROR,
    props<ApiResponseErrors>()
);