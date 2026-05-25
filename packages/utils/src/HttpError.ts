import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError
} from "sequelize";
import { ZodError, treeifyError } from "zod";

export const TypeOfError = {
  REQUEST_VALIDATION: "REQUEST_VALIDATION",
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERRO"
} as const;

type ErrorType = typeof TypeOfError[keyof typeof TypeOfError];

type HttpErrorOptions = {
  cause?: unknown,
  details?: unknown,
  type?: ErrorType;
}


class HttpError extends Error {
  statusCode: number;
  details?: unknown;
  type?: ErrorType = TypeOfError.INTERNAL_SERVER_ERROR;
  constructor(message: string = "Erro interno", statusCode: number = 500, options?: HttpErrorOptions) {
    super(message, {
      cause: options?.cause
    });
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.details = options?.details;
    this.type = options?.type;

    // Object.setPrototypeOf(this, HttpError.prototype);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, HttpError)
  }
  static from(error: unknown): HttpError {
    if(error instanceof ZodError) {
      return new HttpError(
        "Dados inválidos",
        400,
        {
          cause: error?.cause,
          type: TypeOfError.REQUEST_VALIDATION,
          details: treeifyError(error)
        }
      )
    }

    if(error instanceof HttpError) {
      return error
    }
    
    //#region Sequelize Errors
    if(error instanceof ValidationError) {
      return new HttpError(
        "Dados inválidos para persistência",
        400,
        {
          cause: error,
          details: error.errors,
          type: TypeOfError.DATABASE_ERROR
        }
      )
    }

    if(error instanceof UniqueConstraintError){
      return new HttpError(
        "Dados duplicados",
        409,
        {
          cause: error,
          details: error.errors,
          type: TypeOfError.DATABASE_ERROR
        }
      )
    }

    if(error instanceof ForeignKeyConstraintError){
      return new HttpError(
        "Relacionamento inválido",
        409,
        {
          cause: error,
          details: {
            table: error.table,
            fields: error.fields
          },
          type: TypeOfError.DATABASE_ERROR
        }
      )
    }

    if(error instanceof DatabaseError){
      return new HttpError(
        "Erro no banco de dados",
        500,
        {
          cause: error,
          type: TypeOfError.DATABASE_ERROR
        },
      )
    }

    //#endregion

    if(error instanceof Error) {
      return new HttpError(
        error.message,
        500,
        {
          cause: error,
          type: TypeOfError.INTERNAL_SERVER_ERROR
        }
      )
    }

    return new HttpError(
      "Erro desconhecido",
      500,
      {
        cause: "Desconhecido",
        details: error,
        type: TypeOfError.INTERNAL_SERVER_ERROR
      }
    )
  }

  getResponse() {
    return {
      error: {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        type: this.type
      }
    }
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        type: this.type,

        ...(process.env.NODE_ENV !== "production" ? {
          stack: this.stack,
          cause: this.cause
        } : {})
      }
    }
  }
}


export {HttpError};
export type HttpErrorDTO = ReturnType<HttpError["getResponse"]>