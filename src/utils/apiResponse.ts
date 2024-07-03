class ApiResponse {
  success: boolean;
  data: any;
  message: string;
  statusCode: number;
  constructor(
    success: boolean,
    message: string,
    statusCode: number,
    data?: any
  ) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data || {};
  }
}

export default ApiResponse;
