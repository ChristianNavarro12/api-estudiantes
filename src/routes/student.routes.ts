import { Router } from "express";
import * as studentController from "../controllers/student.controller";
import { validateBody, validateParams } from "../middlewares/validate";
import { createStudentSchema, updateStudentSchema, idParamSchema } from "../validators/student.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Gestión de estudiantes
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Student'
 */
router.get("/", studentController.getAll);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obtener un estudiante por id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante obtenido correctamente
 *       404:
 *         description: Estudiante no encontrado
 */
router.get("/:id", validateParams(idParamSchema), studentController.getById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       201:
 *         description: Estudiante creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", validateBody(createStudentSchema), studentController.create);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Actualizar un estudiante existente
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       200:
 *         description: Estudiante actualizado correctamente
 *       404:
 *         description: Estudiante no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put("/:id", validateParams(idParamSchema), validateBody(updateStudentSchema), studentController.update);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado correctamente
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete("/:id", validateParams(idParamSchema), studentController.remove);

export default router;