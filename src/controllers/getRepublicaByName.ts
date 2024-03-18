// repository.ts
import { getRepository, Like } from 'typeorm';
import Republica from '../models/Republica';

async function getRepublicasByName(name: string): Promise<Republica[]> {
 const republicaRepository = getRepository(Republica);

 if (!republicaRepository) {
   throw new Error('RepublicaRepository not initialized.');
}

 const query = republicaRepository
    .createQueryBuilder('republica')
    .where('republica.name LIKE :name', { name: `%${name}%` })
    .getMany();

 return query;
}
export default getRepublicasByName;