import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Query,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('api/v1/friend-service/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(
    @CurrentUser('sub') userId: string,
    @Body() createFriendDto: CreateFriendDto,
  ) {
    return this.friendsService.create(userId, createFriendDto);
  }

  @Get()
  findAll(
    @CurrentUser('sub') userId: string,
    @Query('groupId') groupId?: string,
  ) {
    if (groupId) {
      return this.friendsService.findAllByGroup(userId, groupId);
    }

    return this.friendsService.findAll(userId);
  }

  @Get(':id')
  findOne(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.friendsService.findOne(userId, id);
  }

  @Put(':id')
  update(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() updateFriendDto: UpdateFriendDto,
  ) {
    return this.friendsService.update(userId, id, updateFriendDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.friendsService.remove(userId, id);
  }
}
