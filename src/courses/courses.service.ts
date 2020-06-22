import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';
import { EditCourseDto } from './dto/edit-course.dto';
import { Note } from '../notes/notes.entity';
import { NoteDto } from '../notes/dto/note.dto';
import { CreateAndUpdateColumnDto } from 'src/columns/dto/create-update-column.dto';
import { Columns } from 'src/columns/columns.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}

  async findCourse(courseId: number): Promise<Course> {
    return await this.coursesRepository.findOne(courseId);
  }

  async removeCourse(courseId: number): Promise<void> {
    await this.coursesRepository.delete(courseId);
  }

  async updateCourse(
    editCourseDto: EditCourseDto,
    courseId: number,
  ): Promise<void> {
    const { courseName } = editCourseDto;
    await this.coursesRepository.update(courseId, { courseName });
  }

  async getNotes(courseId: number): Promise<Note[]> {
    return await this.coursesRepository.getNotes(courseId);
  }

  async getColumns(courseId: number): Promise<Columns[]> {
    return await this.coursesRepository.getColumns(courseId);
  }

  async createNote(courseId: number, noteDto: NoteDto): Promise<void> {
    return await this.coursesRepository.createNote(courseId, noteDto);
  }

  async createColumn(
    courseId: number,
    createColumnDto: CreateAndUpdateColumnDto,
  ): Promise<void> {
    return await this.coursesRepository.createColumn(courseId, createColumnDto);
  }
}
