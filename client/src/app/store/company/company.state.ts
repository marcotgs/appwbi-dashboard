import { CompanyResponse, SegmentResponse } from "@shared/interfaces";

export interface CompanyState {
    companies?: CompanyResponse[];
    segments?: SegmentResponse[];
}