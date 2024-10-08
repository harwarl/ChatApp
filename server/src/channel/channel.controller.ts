import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('')
  async createChannel(@Body() body: CreateChannelDto) {
    return await this.channelService.createChannel(body);
  }

  @Put(':id')
  async updateChannel(@Param('id') id: string, @Body() body: UpdateChannelDto) {
    return await this.channelService.updateChannel({ id, channel: body });
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: string) {
    return await this.channelService.deleteChannel({ id });
  }

  @Get('my-channels')
  async getChannelsByUser(@CurrentUser('id') currentUserId: string) {
    return await this.channelService.getChannelsByUser(currentUserId);
  }

  // @Public()
  @Get(':id')
  async getChannel(@Param('id') id: string) {
    console.log('In here');
    return await this.channelService.getChannel(id);
  }
}
