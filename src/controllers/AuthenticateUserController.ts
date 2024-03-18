import { Request, Response } from "express";
import  { AuthenticateUserService }   from "../middlewares/AuthenticateUserService";

export default {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    console.log(email, password);
    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({
      email,
      password,
    });

    return response.status(201).json(token);
  }
}


