import { defineEventHandler, readBody, getMethod, setResponseHeaders } from 'h3';
import { useDatabase } from '#nitro';

export default defineEventHandler(async (event) => {
  // Manejar solicitudes OPTIONS (preflight)
  if (getMethod(event) === 'OPTIONS') {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Métodos permitidos
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Encabezados permitidos
      'Content-Type': 'application/json', // Tipo de contenido
    });
    return ''; // Responder vacío a la solicitud OPTIONS
  }

  // Establecer los encabezados para la respuesta
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
    'Content-Type': 'application/json', // Tipo de contenido
  });

  const db = useDatabase();

  // Leer el término de búsqueda del cuerpo de la solicitud
  const { searchTerm } = await readBody(event);

  try {
    // Consultar en toda la base de datos usando LIKE para encontrar coincidencias
    const query = `
      SELECT * FROM books 
      WHERE title LIKE ? 
      OR author LIKE ? 
      OR content LIKE ?`;  // Si también tienes un campo de contenido o texto de las citas

    // Preparar el valor para la búsqueda, usando % para buscar parcial
    const results = await db.all(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);

    // Devolver los resultados en formato JSON
    return {
      statusCode: 200,
      books: results,
    };
  } catch (error) {
    console.error('Error al buscar en la base de datos:', error);
    return {
      statusCode: 500,
      message: 'Ocurrió un error al buscar en la base de datos.',
    };
  }
});
