import supertest from "supertest";
import app from "../src/app";
import { deleteAllUsers } from "./utils/user";

describe('Users Api', () => {
    describe('POST /api/user/register', () => {
        afterEach( async () => {
            await deleteAllUsers()
        })
        it('should create user', async () => {
            const result = await supertest(app).post('/api/user/register').send({
                username: 'rafiashii',
                name: 'rafiashi',
                email: 'rafiashi@gmail.com',
                password: 'rahasiaa'
            })

            expect(result.status).toBe(201);
            expect(result.body.success).toBe(true);
            expect(result.body.message).toBe('berhasil mendaftarkan akun')
        });
    });
});