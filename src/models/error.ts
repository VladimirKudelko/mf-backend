export class ErrorModel {
  statusCode: number;
  message: string;
  additions: any;

  constructor(code: number, message: string, additions?: any) {
    this.statusCode = code;
    this.message = message;
    this.additions = additions;
  }
}
