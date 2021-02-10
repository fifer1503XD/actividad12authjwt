import jwt from "jsonwebtoken";

//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
    const usuarioingresado = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const token = jwt.sign(usuarioingresado, process.env.SECRET_KEY, { algorithm: "HS384", expiresIn: "1h"});
    return token;
}


//Validar el token 
export const validateJWT =async (token) => {
    try{
        const validar = await jwt.verify(token,process.env.SECRET_KEY);
        if(validar){
            return true
        }
        return false;
    }catch(error){
        return false;
    }
  
}