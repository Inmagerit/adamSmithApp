import { defineEventHandler, readBody, getMethod, setResponseHeaders } from 'h3';
import { useDatabase } from '#imports';

export default defineEventHandler(async (event) => {
  // Manejar solicitudes OPTIONS (preflight)
  if (getMethod(event) === 'OPTIONS' ) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Métodos permitidos
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Encabezados permitidos
      'Content-Type': 'application/json', // Tipo de contenido
    });
    return ''; // Responder vacío a la solicitud OPTIONS
  }
    const method = getMethod(event);
  /*if (method !== 'GET' && method !== 'POST') {
    return {
      statusCode: 405, // Método no permitido
      message: 'HTTP method is not allowed.',
    };
  }

  // Establecer los encabezados para la respuesta
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
    'Content-Type': 'application/json', // Tipo de contenido
  });
  */
 if(method === 'GET'){

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
    'Content-Type': 'application/json', // Tipo de contenido
     })
  return {
    statusCode : 200,
    message : "you correctly got the page"
  }
 }

  if(method === 'POST') {
     
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
    'Content-Type': 'application/json', // Tipo de contenido
     })

  const db = useDatabase();

  // Leer el término de búsqueda del cuerpo de la solicitud
  const { searchTerm } = await readBody(event);
  console.log('Término de búsqueda:', searchTerm);

  try {
    // Consultar en toda la base de datos usando LIKE para encontrar coincidencias
   
    const results = await db.sql`
    SELECT * FROM books
    WHERE title LIKE ${'%' + searchTerm + '%'}
    OR author LIKE ${'%' + searchTerm + '%'}
    OR content LIKE ${'%' + searchTerm + '%'}
  `;
  console.log('Resultados:', results)
  const booksArray = Array.isArray(results.rows) ? results.rows : [];

  if (booksArray.length === 0) {
    return {
      statusCode: 200,
      books: [], // Devuelve un array vacío si no hay resultados
      message: 'No se encontraron libros que coincidan con el término de búsqueda.',
    };
  }
  
  // Devolver los resultados en formato JSON
  return {
    statusCode: 200,
    books: booksArray,
  };
  } catch (error) {
    console.error('Error al buscar en la base de datos:', error);
    return {
      statusCode: 500,
      message: 'Ocurrió un error al buscar en la base de datos.',
    };
  } }
});
