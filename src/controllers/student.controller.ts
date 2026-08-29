import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service";
import { sendSuccess } from "../utils/response";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const students = await studentService.getAllStudents();
    sendSuccess(res, {
      message: "Estudiantes obtenidos correctamente",
      data: students,
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No se encontró un estudiante con id ${id}`,
      });
    }
    sendSuccess(res, {
      message: `Estudiante con id ${id} obtenido correctamente`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const student = await studentService.createStudent(req.body);
    sendSuccess(res, {
      message: "Estudiante creado correctamente",
      data: student,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const student = await studentService.updateStudent(id, req.body);
    sendSuccess(res, {
      message: `Estudiante con id ${id} actualizado correctamente`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await studentService.deleteStudent(id);
    sendSuccess(res, {
      message: `Estudiante con id ${id} eliminado correctamente`,
    });
  } catch (error) {
    next(error);
  }
}