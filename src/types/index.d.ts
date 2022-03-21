declare namespace Express {
  export interface Request {
    userToken: (number | string)[]
  }
}
