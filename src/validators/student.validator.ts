import { z } from "zod";

export const createStudentSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(255),
  apellido: z.string().min(1, "El apellido es obligatorio").max(255),
  edad: z.coerce.number().int().positive("La edad debe ser un número positivo").max(120, "Edad no válida"),
  calificacion: z.coerce.number().min(0, "La calificación mínima es 0").max(10, "La calificación máxima es 10"),
});

export const updateStudentSchema = createStudentSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número entero positivo"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;