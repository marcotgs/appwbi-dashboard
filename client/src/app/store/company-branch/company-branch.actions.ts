import { props, createAction } from '@ngrx/store';
import * as companyBranchTypes from "./company-branch.types";
import {
    ApiResponseErrors, CompanyBranchBody, CompanyBranchResponse,
} from '@shared/interfaces';

export const getCompaniesBranchs = createAction(
    companyBranchTypes.GET_COMPANY_BRANCH
);

export const getCompaniesBranchsSuccess = createAction(
    companyBranchTypes.GET_COMPANY_BRANCH_SUCCESS,
    props<CompanyBranchResponse[]>()
);

export const getCompaniesBranchsError = createAction(
    companyBranchTypes.GET_COMPANY_BRANCH_ERROR,
    props<ApiResponseErrors>()
);

export const postCompanyBranch = createAction(
    companyBranchTypes.POST_COMPANY_BRANCH,
    props<CompanyBranchBody>(),
);

export const postCompanyBranchSuccess = createAction(
    companyBranchTypes.POST_COMPANY_BRANCH_SUCCESS,
    props<CompanyBranchResponse>()
);

export const postCompanyBranchEditSuccess = createAction(
    companyBranchTypes.POST_EDIT_COMPANY_BRANCH_SUCCESS,
    props<CompanyBranchResponse>()
);

export const postCompanyBranchError = createAction(
    companyBranchTypes.POST_COMPANY_BRANCH_ERROR,
    props<ApiResponseErrors>()
);

export const deleteCompanyBranch = createAction(
    companyBranchTypes.DELETE_COMPANY_BRANCH,
    props<{ id: number }>(),
);

export const deleteCompanyBranchSuccess = createAction(
    companyBranchTypes.DELETE_COMPANY_BRANCH_SUCCESS,
    props<{ id: number }>(),
);

export const deleteCompanyBranchError = createAction(
    companyBranchTypes.DELETE_COMPANY_BRANCH_ERROR,
    props<ApiResponseErrors>()
);