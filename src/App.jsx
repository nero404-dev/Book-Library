import { useEffect, useRef, useState } from 'react';
import './App.css';

import Header from './components/Header/Header.jsx';

import AddBook from './components/AddBook/AddBook.jsx';
import BookList from './components/BookList/BookList.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';

import LibraryStats from './components/LibraryStats/LibraryStats.jsx';
import BookSearch from './components/BookSearch/BookSearch.jsx';
import BookModal from './components/BookModal/BookModal.jsx';

import './components/Header/Header.css';

import './components/AddBook/AddBook.css';
import './components/BookList/BookList.css';
import './components/SearchBar/SearchBar.css';

import './components/LibraryStats/LibraryStats.css';
import './components/BookSearch/BookSearch.css';
import './components/BookModal/BookModal.css';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');

    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks);

      return parsedBooks.map((book) => ({
        ...book,
        favorite: book.favorite ?? false,
      }));
    }

    return [
      {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Fiction',
        year: 1988,
        rating: 4,
        status: 'Finished',
        cover: 'https://...',
        createdAt: 1,
        favorite: false,
      },
      {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        genre: 'Self-Help',
        year: 2018,
        rating: 5,
        status: 'Reading',
        cover: 'https://...',
        createdAt: 2,
        favorite: false,
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        year: 1949,
        rating: 3,
        status: 'Want to Read',
        cover: 'https://...',
        createdAt: 3,
        favorite: false,
      },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genreFilter, setGenreFilter] = useState('All');
  const [favoriteFilter, setFavoriteFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [pageInputError, setPageInputError] = useState(false);
  const libraryCountRef = useRef(null);

  const [selectedBookId, setSelectedBookId] = useState(null);

  const booksPerPage = 12;

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    genreFilter,
    favoriteFilter,
    sortBy
  ]);

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  function addBook(book) {
    const alreadyExists = books.some(
      (existingBook) =>
        existingBook.title.toLowerCase().trim() ===
        book.title.toLowerCase().trim() &&
        existingBook.author.toLowerCase().trim() ===
        book.author.toLowerCase().trim()
    );

    if (alreadyExists) {
      return false;
    }

    setBooks((currentBooks) => [...currentBooks, book]);

    return true;
  }

  function deleteBook(id) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id)
    );
  }

  function updateBook(updatedBook) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === updatedBook.id
          ? updatedBook
          : book
      )
    );
  }

  function updateBookStatus(id, newStatus) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id
          ? { ...book, status: newStatus }
          : book
      )
    );
  }

  function toggleFavorite(id) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id
          ? {
            ...book,
            favorite: !book.favorite
          }
          : book
      )
    );
  }

  function resetLibraryView() {
    setSearchTerm('');
    setStatusFilter('All');
    setGenreFilter('All');
    setFavoriteFilter('All');
    setSortBy('recent');
  }

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'All' ||
      book.status === statusFilter;

    const matchesGenre =
      genreFilter === 'All' ||
      book.genre === genreFilter;

    const matchesFavorite =
      favoriteFilter === 'All' ||
      (
        favoriteFilter === 'Favorites' &&
        book.favorite
      );

    return (
      matchesSearch &&
      matchesStatus &&
      matchesGenre &&
      matchesFavorite
    );
  });

  const genres = [
    ...new Set(
      books
        .map((book) => book.genre)
        .filter(Boolean)
    ),
  ];

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title);

      case 'title-desc':
        return b.title.localeCompare(a.title);

      case 'rating-desc':
        return b.rating - a.rating;

      case 'year-desc':
        return (b.year || 0) - (a.year || 0);

      case 'recent':
      default:
        return b.createdAt - a.createdAt;
    }
  });

  const totalPages = Math.ceil(
    sortedBooks.length / booksPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex =
    (currentPage - 1) * booksPerPage;

  const paginatedBooks = sortedBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const selectedBook =
    books.find(
      (book) => book.id === selectedBookId
    ) || null;

  useEffect(() => {
    libraryCountRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [currentPage]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  return (
    <div className="app">

      <div id="top"></div>

      <Header />

      <main>

        {/* HERO */}

        <section className="library-hero">
          <p className="eyebrow">A PERSONAL ARCHIVE</p>

          <h1>Welcome to my library</h1>

          <p className="volume-count">
            {books.length} VOLUMES
          </p>

          <a href="#discover" className="hero-cta">
            RECOMMEND A BOOK
          </a>
        </section>


        {/* BOOK DISCOVERY */}

        <section id="discover" className="book-discovery">

          <BookSearch
            onAddBook={addBook}
          />

          <AddBook
            onAddBook={addBook}
          />

        </section>


        {/* LIBRARY BROWSING */}

        <section id="library" className="library-browse">

          <LibraryStats
            books={books}
          />

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            genreFilter={genreFilter}
            onGenreChange={setGenreFilter}
            genres={genres}
            favoriteFilter={favoriteFilter}
            onFavoriteChange={setFavoriteFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={resetLibraryView}
          />

          <p ref={libraryCountRef} className="library-count">
            Showing <b>{paginatedBooks.length}</b> of <b>{' '}
            {sortedBooks.length}</b> books
          </p>


          <BookList
            books={paginatedBooks}
            totalBooks={books.length}
            onUpdateStatus={updateBookStatus}
            onToggleFavorite={toggleFavorite}
            onSelect={(book) =>
              setSelectedBookId(book.id)
            }
            onReset={resetLibraryView}
          // firstBookRef={firstBookRef}
          />


          {totalPages > 1 && (
            <div className="library-pagination">

              <button
                className='previous-btn'
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>


              <input
                type="text"
                inputMode="numeric"
                value={pageInput}
                className={pageInputError ? 'page-input-error' : ''}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === '') {
                    setPageInput('');
                    setPageInputError(false);
                    return;
                  }

                  if (!/^\d+$/.test(value)) {
                    return;
                  }

                  setPageInput(value);

                  const page = Number(value);

                  if (page < 1 || page > totalPages) {
                    setPageInputError(true);
                    return;
                  }

                  setPageInputError(false);
                  setCurrentPage(page);
                }}
                onBlur={() => {
                  const page = Number(pageInput);

                  if (
                    !Number.isInteger(page) ||
                    page < 1 ||
                    page > totalPages
                  ) {
                    setPageInput(String(currentPage));
                    setPageInputError(false);
                  }
                }}
              />


              <span>
                of {totalPages}
              </span>


              <button
              className='next-btn'
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Next
              </button>

            </div>
          )}

        </section>


        {/* BOOK DETAILS */}

        <BookModal
          book={selectedBook}
          onClose={() =>
            setSelectedBookId(null)
          }
          onUpdate={updateBook}
          onDelete={deleteBook}
          onToggleFavorite={toggleFavorite}
        />

      </main>

    </div>
  );
}

export default App;