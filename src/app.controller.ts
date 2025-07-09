import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.ping();
  }
  
  @Get('healthcheck')
  @ApiOperation({ summary: 'Check the health status' })
  @ApiResponse({ status: 200, description: 'API is working' })
  healthcheck(): Object {
    return this.appService.healthcheck();
  }
}
