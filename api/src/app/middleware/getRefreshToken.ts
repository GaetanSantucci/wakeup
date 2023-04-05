/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import jwt from "jsonwebtoken";
import { Request, Response } from 'express';


function getRefreshToken(req: Request, res: Response) {

  res.json("get RefreshToken")
}

export { getRefreshToken }