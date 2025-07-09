import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';

describe('BooksController (e2e)', () => {
    let app: INestApplication;
    let db: DataSource;

    const baseBook = {
        sbn: '85-359-0277-5',
        name: 'Autobiografia de Alan',
        description: 'Uma perspectiva sobre Alan Wesley',
        author: 'Alan',
        stock: 10,
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        db = app.get(DataSource);
    });

    afterAll(async () => {
        await db.query(`DELETE FROM book WHERE sbn = '${baseBook.sbn}'`);
        await app.close();
    });

    it('POST /books', () => {
        return request(app.getHttpServer())
            .post('/books')
            .send(baseBook)
            .expect(201)
            .then((res) => {
                expect(res.body).toMatchObject(baseBook);
            });
    });

    it('GET /books/:sbn', () => {
        return request(app.getHttpServer())
            .get(`/books/${baseBook.sbn}`)
            .expect(200)
            .then((res) => {
                expect(res.body.name).toBe(baseBook.name);
            });
    });

    it('GET /books', () => {
        return request(app.getHttpServer())
            .get('/books?page=1&limit=10')
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('GET /books/search?q=Autobiografia', () => {
        return request(app.getHttpServer())
            .get('/books/search?q=Autobiografia')
            .expect(200)
            .then((res) => {
                expect(res.body[0].sbn).toBe(baseBook.sbn);
            });
    });

    it('PUT /books/:sbn', () => {
        return request(app.getHttpServer())
            .put(`/books/${baseBook.sbn}`)
            .send({ name: baseBook.name })
            .expect(200)
            .then((res) => {
                expect(res.body.name).toBe(baseBook.name);
            });
    });

    it('PUT /books/:sbn (should reject update if sbn is provided in body)', () => {
        return request(app.getHttpServer())
            .put('/books/85-359-0277-5')
            .send({ sbn: '85-359-0277-5' })
            .expect(400)
            .expect(res => {
                expect(res.body.message).toContain('SBN não pode ser alterado');
            });
    });

    it('DELETE /books/:sbn', async () => {
        await request(app.getHttpServer())
            .delete(`/books/${baseBook.sbn}`)
            .expect(200);

        await request(app.getHttpServer())
            .get(`/books/${baseBook.sbn}`)
            .expect(404);
    });
});
