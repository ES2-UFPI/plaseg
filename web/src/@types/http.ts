export interface HTTPSuccessResponse<T> {
	success: true;
	errors: null;
    data:T;
}

export interface HTTPErrorResponse {
	success: false;
	errors: string[];
	data: null;
}