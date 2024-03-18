import Republica from '../models/Republica';
import imagesView from './images_views';

export default {
   render(republica: Republica) {
    return {
        id: republica.id,
        name: republica.name,
        latitude: republica.latitude,
        longitude: republica.longitude,
        about: republica.about,
        address: republica.address,
        whatsapp: republica.whatsapp,
        open_on_weekends: republica.open_on_weekends,
        images: imagesView.renderMany(republica.images)
    };
   },
   renderMany(republicas: Republica[]) {
       return republicas.map(republica => this.render(republica));
   }
};