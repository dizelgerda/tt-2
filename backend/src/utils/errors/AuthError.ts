import CustomError from "./CustomError";
import { constants } from "node:http2";

class AuthError extends CustomError {
  constructor(message: string) {
    super(message, constants.HTTP_STATUS_UNAUTHORIZED);
  }
}

export default AuthError;
