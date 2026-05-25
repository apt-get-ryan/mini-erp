export type SuccessData = {
  message: string,
  data: unknown,
  statusCode: number,
  details: any | null
} 

class HttpSuccess {
  success: SuccessData;
  constructor({
    message = "Ok",
    data = null,
    statusCode = 200,
    details = null
  }) {
    this.success = {
      message: message,
      statusCode: statusCode,
      ...(data != null && {data}),
      ...(details != null && {details})
    }
  }
  send(res) {
    return res.status(this.success.statusCode).json({
      success: {
        message: this.success.message,
        statusCode: this.success.statusCode,
        ...(this.success.data != null && {data: this.success.data}),
        ...(this.success.details != null && {details: this.success.details})
      }
      
    })
  }

}

export default HttpSuccess;
export type HttpSuccessDTO = {
  success: SuccessData
};