import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from 'yup';
import { hash } from "bcryptjs";

export default {
      
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
        } = req.body;
        

        const usersRepository = getRepository(User);
        if (!email) {
            throw new Error("Email incorrect");
          }
      
          const userAlreadyExists = await usersRepository.findOne({
            email,
          });
      
          if (userAlreadyExists) {
            throw new Error("User already exists");
          }
      
          const passwordHash = await hash(password, 8);
        
        const data = {
            name,
            email,
            password: passwordHash
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const user = usersRepository.create(data);
        await usersRepository.save(user);
        return res.status(201).json(user);

    }
}