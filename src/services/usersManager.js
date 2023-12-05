import UserModel from "../dao/models/users.js";

class UsersManager {
    constructor() {}

    async changePassword(email, newPassword) {
        try {
            const user = await UserModel.findOne({ email: email });

            if (!user) {
                console.log("ERROR")

                return 
            }
            if(user.password != newPassword) {
               user.password = newPassword; 
            }else{
                console.log("La contraseña es la misma que tenias antes")
                return false;
            }
            

            await user.save();

            return true; 
        } catch (error) {
            console.log("Error: " + error);
            return 
        }
    }

    async findUserById(userId) {
        try {
          const user = await UserModel.findById(userId);
      
          if (!user) {
            return null; 
          }
      
          return user.toJSON(); 

        } catch (error) {
          log.error(`Error al buscar el usuario con ID ${userId}: ${error.message}`);
          throw error;
        }
      }

  
}

export default UsersManager;