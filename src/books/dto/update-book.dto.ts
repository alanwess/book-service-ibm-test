import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends OmitType(
  PartialType(CreateBookDto),
  ['sbn'] as const,
) {}