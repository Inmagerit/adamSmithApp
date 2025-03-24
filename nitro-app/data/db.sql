-- Crear la tabla para almacenar los libros
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publication_year INTEGER,
  content TEXT
);

-- Insertar el libro "1984" de George Orwell
INSERT INTO books (title, author, publication_year, content) VALUES
  ('1984', 'George Orwell', 1949, '1984, written by George Orwell, is a dystopian novel set in a totalitarian society where the government, represented by "Big Brother," exercises total control over citizens. The protagonist, Winston Smith, works at the Ministry of Truth, rewriting historical records to match the Party’s ever-changing narrative. Winston rebels against the oppressive regime by starting a forbidden love affair with Julia, but their relationship is ultimately discovered, and Winston is tortured into submission. The novel explores themes of surveillance, censorship, and the consequences of authoritarianism.');
-- Insertar el libro "To Kill a Mockingbird" de Harper Lee
INSERT INTO books (title, author, publication_year, content) VALUES
  ('To Kill a Mockingbird', 'Harper Lee', 1960, 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It is set in the American South during the 1930s and follows the story of Scout Finch, a young girl, and her brother, Jem, as they grow up in a racially divided town. Their father, Atticus Finch, is a lawyer who defends a black man, Tom Robinson, wrongly accused of raping a white woman. Through Scout’s eyes, the novel explores themes of racial injustice, moral growth, and the loss of innocence.');

-- Insertar el libro "Pride and Prejudice" de Jane Austen
INSERT INTO books (title, author, publication_year, content) VALUES
  ('Pride and Prejudice', 'Jane Austen', 1813, 'Pride and Prejudice is a classic novel by Jane Austen that follows the life of Elizabeth Bennet, one of five sisters, as she navigates issues of marriage, morality, and social standing in early 19th-century England. The story centers around Elizabeth’s evolving relationship with the wealthy and aloof Mr. Darcy, whom she initially despises due to his perceived arrogance. The novel critiques the societal expectations of marriage and class, while offering a witty exploration of love, family, and personal growth.');

-- Insertar el libro "The Great Gatsby" de F. Scott Fitzgerald
INSERT INTO books (title, author, publication_year, content) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'The Great Gatsby, written by F. Scott Fitzgerald, is a novel set in the Roaring Twenties in the United States. The story is narrated by Nick Carraway, who becomes intrigued by his mysterious and wea')
