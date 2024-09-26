import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Republica from '../models/Republica';
import republicaView from '../views/republicas_views';
import * as Yup from 'yup';


export default {
    async index(req: Request, res: Response) {
        const republicasRepository = getRepository(Republica);

        const republicas = await republicasRepository.find({
            relations: ['images']
        });
        

        return res.json(republicaView.renderMany(republicas));
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const republicasRepository = getRepository(Republica);

        const republica = await republicasRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(republicaView.render(republica));
    },
    
    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            address,
            whatsapp,
            open_on_weekends,
        } = req.body;
        // console.log(req.body)
    
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
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            address: Yup.string().required(),
            whatsapp: Yup.number().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                    Yup.object().shape({
                    path: Yup.string()  
            })),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const republica = republicasRepository.create(data);
    
        await republicasRepository.save(republica);
       
       
        return res.status(201).json(republica);
    }
}
