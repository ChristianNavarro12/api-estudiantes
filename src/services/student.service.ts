import { prisma } from "../lib/prisma";
import { CreateStudentInput, UpdateStudentInput } from "../validators/student.validator";

export function getAllStudents() {
  return prisma.student.findMany({ orderBy: { id: "asc" } });
}

export function getStudentById(id: number) {
  return prisma.student.findUnique({ where: { id } });
}

export function createStudent(data: CreateStudentInput) {
  return prisma.student.create({ data });
}

export function updateStudent(id: number, data: UpdateStudentInput) {
  return prisma.student.update({ where: { id }, data });
}

export function deleteStudent(id: number) {
  return prisma.student.delete({ where: { id } });
}