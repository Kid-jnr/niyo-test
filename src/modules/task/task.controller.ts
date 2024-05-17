import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { ErrorHelper, HttpResponse } from 'src/utils';
import { AuthGuard } from 'src/guards/auth.guard';
import { IUser, User } from 'src/decorators';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@User() user: IUser, @Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto, user);
    return HttpResponse.success({
      data: task,
      message: 'Tasks record created successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@User() user: IUser) {
    const tasks = await this.taskService.findAll(user.id);
    return HttpResponse.success({
      data: tasks,
      message: 'Tasks record retrieved successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findOne(@User() user: IUser, @Param('id') id: string) {
    const task = await this.taskService.findOne(+id, user.id);

    return HttpResponse.success({
      data: task,
      message: 'Task record retrieved successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Post('/update/:id')
  async updateTask(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskService.updateTask(+id, user.id, updateTaskDto);

    return HttpResponse.success({
      data: task,
      message: 'Task record updated successfully',
    });
  }
}
