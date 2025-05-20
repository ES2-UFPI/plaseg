export type HTTPSuccessResponse<T> = {
	success: true;
	errors: null;
	data: T;
};

export type HTTPErrorResponse = {
	success: false;
	errors: string[];
	data: null;
};

export type HTTPResponse<T> = HTTPSuccessResponse<T> | HTTPErrorResponse;
