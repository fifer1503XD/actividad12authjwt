import {Users} from "../models";
import {validateJWT} from "../middlewares/jwt";

export const verifyUsers = async (req, res) => {
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

export const verifyUsersId = async (req, res) => {
    const {token} = req.body;
    let validar= await validateJWT(token)
    console.log(validar)
   
    if(await validateJWT(token)===true){
        const results = await Users.findOne({where: {id:req.params.id}});
        res.json(results);
    }
    else{
        return res.json({
            message: "Token no valido"
        });
    }
}

module.exports = {
    verifyUsers,
verifyUsersId}