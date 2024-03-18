import User from '../models/User';

export default {
   render(users: User) {
    return {
        id: users.id,
        name: users.name,
        email: users.email,
        password: users.password,  
    };
   },
   renderMany(users: User[]) {
    return users.map(users => this.render(users));
}
};