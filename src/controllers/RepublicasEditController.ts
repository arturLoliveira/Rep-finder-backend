import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Republica from '../models/Republica';
import republicaView from '../views/republicas_views';
import * as Yup from 'yup';


export default {  
    async excludeRep(req: Request, res: Response) {
        const id = req.params.id;
        const republicasRepository = getRepository(Republica);

        republicasRepository.delete(id);
    },
    async updateRep(req: Request, res: Response) {
        const {
            // id,
            name,
            latitude,
            longitude,
            about,
            address,
            whatsapp,
            open_on_weekends,
        } = req.body;
       const id  = req.params.id

       
        const republicasRepository = getRepository(Republica);

        const requestImages = req.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return { path: image.filename }
        })
        const data = {
            name,
            latitude,
            longitude,
            about,
            address,
            whatsapp,
            open_on_weekends: open_on_weekends == 'true',
            images
        };
    
        const schema = Yup.object().shape({
            name: Yup.string(),
            latitude: Yup.number(),
            longitude: Yup.number(),
            about: Yup.string().max(300),
            address: Yup.string(),
            whatsapp: Yup.number(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(
                    Yup.object().shape({
                    path: Yup.string()  
            })),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        republicasRepository.delete(id);
        republicasRepository.save(data);
        
        return res.status(201).json(data);
        }
        
}
