import { Injectable } from '@nestjs/common';
import {
  CreateProjectDto,
  CreateProjectItemDto,
  CreateTaskDto,
} from './dto/project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async createProject(dto: CreateProjectDto, ownerId: string) {
    const project = await this.prismaService.project.create({
      data: {
        name: dto.name,
        color: dto.color,
        isFavorited: dto.isFavorited,
        User: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
    return project;
  }
  async getProjectByUserId(id: string) {
    const projects = await this.prismaService.project.findMany({
      where: {
        ownerId: id,
      },
      select: {
        color: true,
        createdAt: true,
        id: true,
        isFavorited: true,
        name: true,
        ownerId: true,
        ProjectCollaboratorion: {
          select: {
            createdAt: true,
            id: true,
          },
        },
        ProjectItem: {
          select: {
            createdAt: true,
            description: true,
            id: true,
            name: true,
            Task: {
              select: {
                deadline: true,
                description: true,
                createdAt: true,
                id: true,
                name: true,
                priority: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
    return {
      projects: projects,
      total_projects: projects.length,
    };
  }

  async getProjectItemByIdProject(projectId: string) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        color: true,
        createdAt: true,
        id: true,
        isFavorited: true,
        name: true,
        ownerId: true,
        updatedAt: true,
        ProjectCollaboratorion: {
          select: {
            id: true,
            User: {
              select: {
                avatarPath: true,
                createdAt: true,
                name: true,
                dateBorn: true,
                description: true,
                email: true,
                id: true,
                lastOnlineTime: true,
                login: true,
              },
            },
          },
        },
      },
    });

    const projectItems = await this.prismaService.projectItem.findMany({
      where: {
        projectId: projectId,
      },
      select: {
        description: true,
        name: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        Task: {
          select: {
            createdAt: true,
            deadline: true,
            description: true,
            id: true,
            name: true,
            priority: true,
            updatedAt: true,
            isCompleted: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    projectItems.forEach((item) => {
      if (item.Task) {
        item.Task.sort((a, b) => {
          const isCompletedA = a.isCompleted ? 0 : 1;
          const isCompletedB = b.isCompleted ? 0 : 1;
          return isCompletedB - isCompletedA;
        });
      }
    });

    return {
      projectItems: projectItems,
      total_projectItems: projectItems.length,
      project: project,
    };
  }

  async favoritedProjectsById(userId: string) {
    const projects = await this.prismaService.project.findMany({
      where: {
        User: {
          id: userId,
        },
        isFavorited: true,
      },
      select: {
        color: true,
        createdAt: true,
        id: true,
        isFavorited: true,
        name: true,
        ownerId: true,
        updatedAt: true,
        ProjectCollaboratorion: {
          select: {
            id: true,
            User: {
              select: {
                avatarPath: true,
                createdAt: true,
                name: true,
                dateBorn: true,
                description: true,
                email: true,
                id: true,
                lastOnlineTime: true,
                login: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });
    return {
      projects: projects,
      total_projects: projects.length,
    };
  }
  async createTask(projectItemId: string, dto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        priority: dto.priority,
        deadline: dto.deadline,
        ProjectItem: {
          connect: {
            id: projectItemId,
          },
        },
      },
    });
  }

  async createProjectItem(projectId: string, dto: CreateProjectItemDto) {
    return await this.prismaService.projectItem.create({
      data: {
        Project: {
          connect: {
            id: projectId,
          },
        },
        name: dto.name,
      },
    });
  }

  async changeTaskCompleted(taskId: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    return await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        isCompleted: !task.isCompleted,
      },
    });
  }

  async updateProjectName(projectId: string, name: string) {
    return await this.prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
      },
    });
  }

  async updateProjectItemName(projectItemId: string, name: string) {
    return await this.prismaService.projectItem.update({
      where: {
        id: projectItemId,
      },
      data: {
        name: name,
      },
    });
  }

  async updateTaskById(taskId: string, dto: CreateTaskDto) {
    return await this.prismaService.task.update({
      where: { id: taskId },
      data: {
        name: dto.name,
        priority: dto.priority,
        description: dto.description,
      },
    });
  }
  async deleteProject(projectId: string) {
    return await this.prismaService.project.delete({
      where: {
        id: projectId,
      },
    });
  }

  async deleteProjectItem(projectItemId: string) {
    return await this.prismaService.projectItem.delete({
      where: {
        id: projectItemId,
      },
    });
  }
  async deleteTask(taskId: string) {
    return await this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
