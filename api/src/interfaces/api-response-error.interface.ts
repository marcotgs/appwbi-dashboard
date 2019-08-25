export interface ApiResponseErrors {
    errors: ApiResponseError[];
}

export interface ApiResponseError {
    type?: string;
    message: any; 
}