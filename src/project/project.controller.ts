import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  CreateProjectItemDto,
  CreateTaskDto,
} from './dto/project.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @Auth()
  async createProject(
    @Body() dto: CreateProjectDto,
    @CurrentUser('id') ownerId: string,
  ) {
    return await this.projectService.createProject(dto, ownerId);
  }

  @Get('user/by-id')
  @Auth()
  async getProjectByUserId(@CurrentUser('id') ownerId: string) {
    return await this.projectService.getProjectByUserId(ownerId);
  }

  @Get('project/by-id/:projectId')
  @Auth()
  async getProjectItemByIdProject(@Param('projectId') projectId: string) {
    return await this.projectService.getProjectItemByIdProject(projectId);
  }

  @Post('create-task/:projectItemId')
  @Auth()
  async createTask(
    @Param('projectItemId') projectItemId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return await this.projectService.createTask(projectItemId, dto);
  }

  @Post('create-project/:projectId')
  @Auth()
  async createProjectItem(
    @Param('projectId') projectId: string,
    @Body() dto: CreateProjectItemDto,
  ) {
    return await this.projectService.createProjectItem(projectId, dto);
  }
}
