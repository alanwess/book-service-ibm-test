import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockBook = {
  sbn: '85-359-0277-5',
  name: 'Autobiografia de Alan',
  description: 'Uma perspectiva sobre Alan Wesley',
  author: 'Alan',
  stock: 10,
};

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockBook),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn().mockResolvedValue(mockBook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create service', () => {
    it('create a book', async () => {
      const result = await service.create(mockBook);
      expect(repo.create).toHaveBeenCalledWith(mockBook);
      expect(repo.save).toHaveBeenCalledWith(mockBook);
      expect(result).toEqual(mockBook);
    });
  });

  describe('find all service', () => {
    it('return paginated books', async () => {
      const books = [mockBook];
      repo.find = jest.fn().mockResolvedValue(books);

      const result = await service.findAll(1, 10);
      expect(repo.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
      expect(result).toEqual(books);
    });
  });

  describe('search service', () => {
    it('return books matching query', async () => {
      const books = [mockBook];
      repo.find = jest.fn().mockResolvedValue(books);

      const result = await service.search('Autobiografia');
      expect(repo.find).toHaveBeenCalledWith({
        where: [
          { name: expect.anything() },
          { description: expect.anything() },
          { author: expect.anything() },
        ],
      });
      expect(result).toEqual(books);
    });
  });

  describe('find one service', () => {
    it('return a book by SBN', async () => {
      repo.findOne = jest.fn().mockResolvedValue(mockBook);
      const result = await service.findOne(mockBook.sbn);
      expect(result).toEqual(mockBook);
    });

    it('throw NotFoundException if not found', async () => {
      repo.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.findOne('0000')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update service', () => {
    it('update a book', async () => {
      repo.findOne = jest.fn().mockResolvedValue(mockBook);
      const updated = { name: 'Updated Book' };
      const result = await service.update(mockBook.sbn, updated);
      expect(repo.save).toHaveBeenCalledWith({ ...mockBook, ...updated });
      expect(result).toEqual(mockBook);
    });
  });

  describe('remove service', () => {
    it('remove a book', async () => {
      repo.findOne = jest.fn().mockResolvedValue(mockBook);
      const result = await service.remove(mockBook.sbn);
      expect(repo.remove).toHaveBeenCalledWith(mockBook);
      expect(result).toEqual(mockBook);
    });
  });
});
