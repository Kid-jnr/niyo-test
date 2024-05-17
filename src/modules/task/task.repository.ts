import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private prismaService: PrismaService) {}

  async createTask(params: {
    data: Prisma.TaskCreateManyInput;
  }): Promise<Task> {
    const { data } = params;
    return this.prismaService.task.create({ data });
  }

  async getTask(params: { where: Prisma.TaskWhereUniqueInput }) {
    const { where } = params;
    return this.prismaService.task.findUnique({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async getAllTasks(params: { where: Prisma.TaskWhereInput }) {
    const { where } = params;
    return this.prismaService.task.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }) {
    const { where, data } = params;

    return this.prismaService.task.update({
      where,
      data,
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
