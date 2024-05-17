import { Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async create(taskInfo: CreateTaskDto, user: any) {
    let data = {
      name: taskInfo.name,
      description: taskInfo.description,
      status: taskInfo.status,
      userId: user.id,
    };
    const task = await this.taskRepository.createTask({ data });
    return task;
  }

  async findOne(id: number, userId: number) {
    return await this.taskRepository.getTask({
      where: { id, user: { id: userId } },
    });
  }

  async findAll(userId: number) {
    return await this.taskRepository.getAllTasks({
      where: { user: { id: userId } },
    });
  }

  async updateTask(id: number, userId: number, data: UpdateTaskDto) {
    return await this.taskRepository.updateTask({
      where: { id, user: { id: userId } },
      data,
    });
  }
}
