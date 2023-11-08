import CustomError from "./CustomError";
import { constants } from "node:http2";

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, constants.HTTP_STATUS_BAD_REQUEST);
  }
}

export default ValidationError;
