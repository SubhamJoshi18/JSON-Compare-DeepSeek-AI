import httpStatusCode from "http-status-codes";

class AppError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = "App Error";
    Object.setPrototypeOf(this, new.target.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }
}

class DatabaseExceptions extends AppError {
  constructor(message: string, statusCode = httpStatusCode.CONFLICT) {
    super(message, statusCode);
    this.name = "Database Exceptions";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class JSONExceptions extends AppError {
  constructor(message: string, statusCode = httpStatusCode.CONFLICT) {
    super(message, statusCode);
    this.name = "JSON Exceptions";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { AppError, DatabaseExceptions, JSONExceptions };
