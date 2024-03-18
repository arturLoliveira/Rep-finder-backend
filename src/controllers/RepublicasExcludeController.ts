import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Republica from '../models/Republica';


export default {  
    async excludeRep(req: Request, res: Response) {
        const id = req.params.id;
        const republicasRepository = getRepository(Republica);

        republicasRepository.delete(id);
    }
}
