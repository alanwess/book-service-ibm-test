import {
  Controller, Get, Post, Body, Param, Delete, Query, Put,
  BadRequestException
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Logger } from '@nestjs/common';

@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name)

  constructor(private readonly service: BooksService) {}

  private logRequest(endpoint: string, action: string) : string {
    const now = new Date();

    const pad = (num: number, size = 2) => String(num).padStart(size, '0');

    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;

    return `[${timestamp}] [${endpoint}] → ${action}`
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    this.logger.log(this.logRequest('/books', 'POST'))

    if (!('sbn' in dto)) {
      throw new BadRequestException('SBN é obrigatório');
    } else {
      if (dto.sbn === ''){
        throw new BadRequestException('SBN não pode ser vazio');
      }

      if (dto.sbn.length < 10) {
        throw new BadRequestException('SBN deve ter no minimo 10 caracteres');
      }
    }

    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    this.logger.log(this.logRequest('/books', 'GET'))

    return this.service.findAll(+page, +limit);
  }

  @Get('search')
  search(@Query('q') q: string) {
    this.logger.log(this.logRequest('/books/search', 'GET'))

    return this.service.search(q);
  }

  @Get(':sbn')
  findOne(@Param('sbn') sbn: string) {
    this.logger.log(this.logRequest('/books/:sbn', 'GET'))

    return this.service.findOne(sbn);
  }

  @Put(':sbn')
  update(@Param('sbn') sbn: string, @Body() dto: UpdateBookDto) {
    this.logger.log(this.logRequest('/books/:sbn', 'PUT'))

    if ('sbn' in dto) {
      throw new BadRequestException('SBN não pode ser alterado');
    }

    return this.service.update(sbn, dto);
  }

  @Delete(':sbn')
  remove(@Param('sbn') sbn: string) {
    this.logger.log(this.logRequest('/books/:sbn', 'DELETE'))

    return this.service.remove(sbn);
  }
}