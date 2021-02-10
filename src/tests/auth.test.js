import request from "supertest";
import app from "../index";
import {Users} from "../models/";

const user = {
    firstName: "Gustavo",
    lastName: "Hernandez",
    email: "gus91@gmail.com",
    password: "gus12345&"
}

const userLogin = {
    email: "gus91@gmail.com",
    password: "gus12345&"
}

const invalidUserLogin = {
    email: "gus91@gmail.com",
    password: "gus123456&"
}

const invalidUser = {
    firstName: "",
    lastName: "",
    email: "gus02@gmail.com",
    password: "gus12345&"
}

let token = "";
let invalidToken = "2yhasidi12691djsdkabao"
let userID = 0;

describe("Pruebas Usuarios", () => {

    it("Agregar al usuario Gustavo", async () => {
        const results = await request(app)
        .post("/signin")
        .send(user);
        expect(results.statusCode).toEqual(201);
        expect(results.body).toHaveProperty('email', user.email);
        userID = results.id;
    });

    it("Registro fallido al agregar un usuario con el mismo correo", async () => {
        const results = await request(app)
        .post("/signin")
        .send(user);
        expect(results.statusCode).toBeGreaterThanOrEqual(400);
        expect(results.body).toHaveProperty('message');
    });

    it("Registro fallido al agregar un usuario sin nombre y apellido", async () => {
        const results = await request(app)
        .post("/signin")
        .send(invalidUser);
        expect(results.statusCode).toBeGreaterThanOrEqual(400);
        expect(results.body).toHaveProperty('message');
    });
});

describe("Autenticacion", () => {
    it("Iniciar sesión", async () => {
        const results = await request(app)
        .post("/login")
        .send(userLogin);
        expect(results.statusCode).toBeGreaterThanOrEqual(200);
        expect(results.body).toHaveProperty('message');
    });

    it("Inicio de sesión con credenciales incorrectas", async () => {
        const results = await request(app)
        .post("/login")
        .send(invalidUserLogin);
        expect(results.statusCode).toBeGreaterThanOrEqual(401);
        expect(results.body).toHaveProperty('message');
    });

    it("Inicio de sesión y respuesta de un token JWT", async () => {
        const results = await request(app)
        .post("/login")
        .send(userLogin);
        expect(results.statusCode).toBeGreaterThanOrEqual(200);
        expect(results.body).toHaveProperty('token');
        token = results.token;
    });
});

describe("Acceso a rutas protegidas | Autorización | (Opcional)", () => {
    it("Obtener un usuario por ID con token de autorización", async () => {
        const results = await request(app)
        .get("/users/" + userID)
        .set('Authorization', 'Bearer ' + token);
        expect(results.statusCode).toBeGreaterThanOrEqual(200);
        expect(results.body).toHaveProperty('lastName', 'Hernandez');
    });

    it("Obtener todos los usuarios con token de autorización", async () => {
        const results = await request(app)
        .get("/users")
        .set('Authorization', 'Bearer ' + token);
        expect(results.statusCode).toBeGreaterThanOrEqual(200);
        expect(typeof results.body).toBe('array');
        expect(results.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining(user),
            ])
        );
    });

    it("Obtener todos los usuarios con token de autorización invalido", async () => {
        const results = await request(app)
        .get("/users")
        .set('Authorization', 'Bearer ' + invalidToken);
        expect(results.statusCode).toBeGreaterThanOrEqual(401);
        expect(results.body).toHaveProperty('message');
    });
});

beforeAll(done => {
    done();
});


afterAll(async (done) => {
    //Borrar todos los datos de la base de datos
    await Users.destroy({where: {email: "gus91@gmail.com"}});
    await Users.destroy({where: {email: "gus02@gmail.com"}});
    done();
});
