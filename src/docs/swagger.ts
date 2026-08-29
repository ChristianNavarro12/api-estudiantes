import swaggerJsdoc from "swagger-jsdoc";

const isProd = process.env.NODE_ENV === "production";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Estudiantes",
      version: "1.0.0",
      description: "API REST para gestión de estudiantes — CRUD con validación (Zod) y Prisma + MySQL.",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Student: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Ana" },
            apellido: { type: "string", example: "Torres" },
            edad: { type: "integer", example: 22 },
            calificacion: { type: "number", format: "float", example: 9.5 },
          },
        },
        StudentInput: {
          type: "object",
          required: ["nombre", "apellido", "edad", "calificacion"],
          properties: {
            nombre: { type: "string", example: "Ana" },
            apellido: { type: "string", example: "Torres" },
            edad: { type: "integer", example: 22 },
            calificacion: { type: "number", format: "float", example: 9.5 },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operación exitosa" },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Error de validación" },
          },
        },
      },
    },
  },
  // En producción los comentarios viven en el JS compilado (dist), no en src
  apis: [isProd ? "./dist/routes/*.js" : "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);