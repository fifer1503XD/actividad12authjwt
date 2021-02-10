import {Users} from "../models/";
import bcryptjs from "bcryptjs";
import {generateJWT,validateJWT} from "../middlewares/jwt";
//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
export const login = async (req, res) => {
    const {email, password} = req.body;
    const results = await Users.findOne({where: {email: email}});
    console.log('el resultado'+results)
    if(results){
        const comparar = bcryptjs.compareSync(password, results.password);
        
        if(comparar){
            const token = generateJWT(results);
            return res.status(201)
        }
        return res.json({
            status:401,
            message: "401 - Es necesario autenticar para obtener la respuesta solicitada."
        });
    }
    return res.json({
        status:401,
        message: "401 - Es necesario autenticar para obtener la respuesta solicitada."
    });
}

//2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio
export const signIn = async (req, res) => {
    const {firstName,lastName,email, password} = req.body;
    const revisarUserExiste = await Users.findOne({where: {email: email}});
    if(firstName===""||lastName===""||email===""||password===""||revisarUserExiste){
        return res.json({
            status:400,
            message: "400 - El servidor no pudo interpretar la solicitud dada una sintaxis inválida."
        });
    }
    
    try{
        const pass = req.body.password;
        const encryptedPass = bcryptjs.hashSync(pass, 10); //encripto la contraseña con bcrypt
        req.body.password = encryptedPass; //reasignando la contraseña encriptada
        const results = await Users.create(req.body);
        return res.json({
            status:201,
            message: "201 - La solicitud ha tenido éxito y se ha creado un nuevo recurso"
        });
    }catch(error){
        console.log(error);
    }
}
export const verify = async (req, res) => {
    const {token} = req.body;
    let validar= await validateJWT(token)
    console.log(validar)
   
    if(await validateJWT(token)===true){
        const results = await Users.findAll();
        res.json(results);
    }
    else{
        return res.json({
            message: "Token no valido"
        });
    }
}



module.exports = {
    signIn,
    login,
    verify}