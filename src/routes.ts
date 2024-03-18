import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import RepublicasController from './controllers/RepublicasController';
import RepublicasEditController from './controllers/RepublicasEditController';
import RepublicasExcludeController from './controllers/RepublicasExcludeController';
import UsersController from './controllers/UsersController';
import getRepublicasByName from './controllers/getRepublicaByName';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import  AuthenticateUserController  from './controllers/AuthenticateUserController';



const routers = Router();
const upload = multer(uploadConfig);

routers.get('/republicas', RepublicasController.index);
routers.get('/republicas/:id', RepublicasController.show);
routers.get('/find', async (req, res) => {
    const search = req.query.search as string;
    
    const republicas = await getRepublicasByName(search);
    console.log(republicas)
    res.json(republicas);
});
routers.post('/login', AuthenticateUserController.handle)

routers.post('/republicas', upload.array('images'), RepublicasController.create);
routers.post('/users', UsersController.create);
routers.post('/republicasEdit/:id',  upload.array('images'), RepublicasEditController.updateRep);
routers.post('/republicasExclude/:id', RepublicasExcludeController.excludeRep);




export default routers;


