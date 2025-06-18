import { useState } from 'react';

function SearchQuotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);


  const fetchArchiveItems = async (author, year) => {
  const query = `creator:"${author}" AND year:${year}`;
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier&fl[]=title&output=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Resultados del Internet Archive:", data.response.docs);
    return data.response.docs;
  } catch (error) {
    console.error("Error al consultar el Internet Archive:", error);
    return [];
  }
};

  const searchQuotes = async () => {
    try {
      // Hacemos la solicitud al servidor
      let response
      try {const response = await fetch('http://localhost:4000/');
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      console.log('Datos recibidos:', data);}
      catch(err){
        console.log('error al hacer la peticion get', err)
      }
      try {
        response = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchTerm }), // Enviamos la cadena de búsqueda
        });
      } catch (err) {
        console.error('Error al hacer la solicitud:', err);
        setError('Error de red. Por favor, inténtalo de nuevo.');
        return; // Salimos de la función si hay un error en la solicitud
      }

      // Verificamos si la respuesta es correcta
      let data;
      try {
        data = await response.json(); // Intentamos parsear la respuesta
      } catch (err) {
        console.error('Error al procesar la respuesta JSON:', err);
        setError('La respuesta no es un JSON válido.');
        return;
      }

      // Validamos el estado de la respuesta
      if (response.ok) {
        if (data.books) {
          setBooks(data.books); // Asignamos los libros si todo está bien
          setError(null);
          console.log(books)
        } else {
          setError('No se encontraron libros.');
          setBooks([]); // Limpia la lista si no se encuentran libros
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status);
        setError(data.message || 'Ocurrió un error en el servidor.');
        setBooks([]); // Limpia la lista si hay error en la respuesta
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Ocurrió un error inesperado.');
    }
  };
const searchQuotesInArchive = async () => {
    try {
      // Hacemos la solicitud al servidor
      let response
      try {const response = await fetch('http://localhost:4000/');
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      console.log('Datos recibidos:', data);}
      catch(err){
        console.log('error al hacer la peticion get', err)
      }
      try {
        response = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchTerm }), // Enviamos la cadena de búsqueda
        });
      } catch (err) {
        console.error('Error al hacer la solicitud:', err);
        setError('Error de red. Por favor, inténtalo de nuevo.');
        return; // Salimos de la función si hay un error en la solicitud
      }

      // Verificamos si la respuesta es correcta
      let data;
      try {
        data = await response.json(); // Intentamos parsear la respuesta
      } catch (err) {
        console.error('Error al procesar la respuesta JSON:', err);
        setError('La respuesta no es un JSON válido.');
        return;
      }

      // Validamos el estado de la respuesta
      if (response.ok) {
        if (data.books) {
          setBooks(data.books); // Asignamos los libros si todo está bien
          setError(null);
          console.log(books)
          const firstBook = data.books[0];
          const author = firstBook.author;
          const publicationYear = firstBook.publication_year;

          console.log('Autor:', author);
          console.log('Año de publicación:', publicationYear);

          const archiveResults = await fetchArchiveItems(author, publicationYear);



        console.log("Libros en el Archive.org:", archiveResults);

        } else {
          setError('No se encontraron libros.');
          setBooks([]); // Limpia la lista si no se encuentran libros
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status);
        setError(data.message || 'Ocurrió un error en el servidor.');
        setBooks([]); // Limpia la lista si hay error en la respuesta
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Ocurrió un error inesperado.');
    }
  };
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar citas"
      />
      <button onClick={searchQuotes}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} </li>
        ))}
      </ul>
      <button onClick={searchQuotesInArchive}>SEARCH IN ARCHIVE</button>
    </div>
  );
}

export default SearchQuotes;
