import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Republica from '../models/Republica';
import Image from '../models/Image';
import path from 'path';
import fs from 'fs';

export default {
    async excludeRep(req: Request, res: Response) {
        const id = req.params.id;
        const republicasRepository = getRepository(Republica);
        const imagesRepository = getRepository(Image);

       
        const republica = await republicasRepository.findOne(id, { relations: ['images'] }); 

        if (!republica) {
            return res.status(404).json({ error: 'República não encontrada' });
        }

        
        if (republica.images && republica.images.length > 0) {
            republica.images.forEach(async (image) => {
                const imagePath = path.join(__dirname, '..', '..', 'uploads', image.path); 

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); 
                    await imagesRepository.delete(image.id);
                }
            });
        }

        
        await republicasRepository.delete(id);

       
        return res.status(200).json({ message: 'República e imagens excluídas com sucesso' });
    }
}
