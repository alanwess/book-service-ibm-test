import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  create(dto: CreateBookDto) {
    const book = this.repo.create(dto);
    return this.repo.save(book);
  }

  findAll(page = 1, limit = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  search(query: string) {
    return this.repo.find({
      where: [
        { name: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
        { author: ILike(`%${query}%`) },
      ],
    });
  }

  async findOne(sbn: string) {
    const book = await this.repo.findOne({ where: { sbn } });
    if (!book) throw new NotFoundException('Livro não encontrado');
    return book;
  }

  async update(sbn: string, dto: UpdateBookDto) {
    const book = await this.findOne(sbn);
    Object.assign(book, dto);
    return this.repo.save(book);
  }

  async remove(sbn: string) {
    const book = await this.findOne(sbn);
    return this.repo.remove(book);
  }
}
