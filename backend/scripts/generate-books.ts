import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from '../src/books/entities/book.entity';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [Book],
});

async function generateBooksJSON() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Gere 10 livros fictícios em JSON com os seguintes campos:
- sbn (string de 13 dígitos)
- name
- description (curta)
- author
- stock (número entre 0 e 100)

Formato:
[
  {
    "sbn": "9781234567890",
    "name": "Nome do Livro",
    "description": "Descrição...",
    "author": "Autor",
    "stock": 50
  }
]
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const match = text.match(/\[.*\]/s);
  if (!match) throw new Error('Não foi possível extrair JSON do Gemini');
  return JSON.parse(match[0]);
}

async function main() {
  await AppDataSource.initialize();
  const booksRepo = AppDataSource.getRepository(Book);

  const mockBooks = await generateBooksJSON();

  const entities = mockBooks.map((b: any) =>
    booksRepo.create({
      sbn: b.sbn,
      name: b.name,
      description: b.description,
      author: b.author,
      stock: b.stock,
    }),
  );

  await booksRepo.save(entities);
  console.log(`${entities.length} livros inseridos com sucesso no banco.`);

  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error('Erro ao gerar/inserir livros:', err);
});
