import { CompanyResponse, SegmentResponse, ApiResponseErrors } from "@shared/interfaces";

export interface CompanyState {
    companies?: CompanyResponse[];
    apiErrors?: ApiResponseErrors,
    segments?: SegmentResponse[];
}