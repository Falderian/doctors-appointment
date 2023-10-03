import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { ISlot } from './types/slots.types';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get('available')
  getAvailableSlots() {
    return this.slotsService.getAvailableSlots();
  }

  @Get('available/:id')
  getAvailableDocsSlots(@Param('id') id: string) {
    return this.slotsService.getAvailableDocsSlots(+id);
  }

  @Get('available/spec/:spec')
  getAvailableSpecsSlots(@Param('spec') spec: string) {
    return this.slotsService.getAvailableSpecsSlots(spec);
  }

  @Post('/take')
  takeSlot(@Body() slot: ISlot) {
    return this.slotsService.takeSlot(slot);
  }
}
