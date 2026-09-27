import { useEffect, useRef, useState } from 'react';
import './BookSearch.css';

function getGenre(book) {
    const subjects = book.subject || [];

    const genreMap = [
        {
            genre: 'Fantasy',
            keywords: ['fantasy', 'magic', 'wizards', 'dragons'],
        },
        {
            genre: 'Science Fiction',
            keywords: [
                'science fiction',
                'sci-fi',
                'science',
                'space',
                'robots',
            ],
        },
        {
            genre: 'Mystery',
            keywords: [
                'mystery',
                'detective',
                'detective fiction',
                'crime',
            ],
        },
        {
            genre: 'Thriller',
            keywords: ['thriller', 'suspense'],
        },
        {
            genre: 'Romance',
            keywords: ['romance', 'love stories', 'love'],
        },
        {
            genre: 'Horror',
            keywords: ['horror', 'ghost stories', 'vampires'],
        },
        {
            genre: 'Biography',
            keywords: ['biography', 'autobiography', 'memoir'],
        },
        {
            genre: 'History',
            keywords: ['history', 'historical'],
        },
        {
            genre: 'Philosophy',
            keywords: ['philosophy', 'philosophical'],
        },
        {
            genre: 'Poetry',
            keywords: ['poetry', 'poems', 'poets'],
        },
        {
            genre: 'Drama',
            keywords: ['drama', 'plays'],
        },
        {
            genre: 'Dystopian',
            keywords: ['dystopian', 'dystopias'],
        },
        {
            genre: 'Self-Help',
            keywords: ['self-help', 'self help', 'personal development'],
        },
        {
            genre: 'Fiction',
            keywords: ['fiction', 'novels', 'literature'],
        },
    ];

    for (const subject of subjects) {
        const normalizedSubject = subject.toLowerCase();

        for (const group of genreMap) {
            const matches = group.keywords.some((keyword) =>
                normalizedSubject.includes(keyword)
            );

            if (matches) {
                return group.genre;
            }
        }
    }

    return 'Unknown Genre';
}

function BookSearch({ onAddBook }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);
    const resultsRef = useRef(null);

    const searchInputRef = useRef(null);

    useEffect(() => {
        function handleKeyDown(event) {
            const tagName = event.target.tagName;

            const isTyping =
                tagName === 'INPUT' ||
                tagName === 'TEXTAREA' ||
                tagName === 'SELECT';

            if (event.key === '/' && !isTyping) {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, []);

    useEffect(() => {
        if (!hasSearched || page === 1 || results.length === 0) return;

        resultsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, [results, page, hasSearched]);

    async function searchBooks(pageNumber = 1) {
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${pageNumber}&limit=10&fields=key,title,author_name,first_publish_year,cover_i,subject,ratings_average`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();

            const books = data.docs.filter((book) => book.title);

            setResults(books);
            setTotalResults(data.num_found || 0);
            setPage(pageNumber);
            setHasSearched(true);

        } catch (error) {
            console.error('Failed to search books:', error);
            setError('Something went wrong while searching.');
        } finally {
            setLoading(false);
        }
    }

    function clearSearch() {
        setQuery('');
        setResults([]);
        setMessage('');
        setError('');
        setPage(1);
        setTotalResults(0);
        setHasSearched(false);
    }

    function handleAddBook(book) {
        const newBook = {
            id: Date.now(),
            openLibraryKey: book.key || null,
            title: book.title,
            author: book.author_name?.[0] || 'Unknown Author',
            genre: getGenre(book),
            year: book.first_publish_year || null,
            rating: book.ratings_average
                ? Math.round(book.ratings_average)
                : 0,
            status: 'Want to Read',
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : '',
            createdAt: Date.now(),
            favorite: false,
        };

        const added = onAddBook(newBook);

        if (added) {
            setMessage(`${newBook.title} added to your library.`);
        } else {
            setMessage(`${newBook.title} is already in your library.`);
        }
    }

    return (
        <section className="book-search">

            <div className="section-heading">
                <p className="section-eyebrow">
                    DISCOVER
                </p>

                <h2>
                    Find a book in the archive
                </h2>
            </div>


            <form
                className="book-search-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    searchBooks(1);
                }}
            >

                <div className="book-search-input-wrap">

                    <input
                        ref={searchInputRef}
                        type="search"
                        placeholder="Search for a book..."
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                    />

                    {query && (
                        <button
                            type="button"
                            className="book-search-clear"
                            onClick={clearSearch}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}

                </div>


                <button
                    type="submit"
                    // className="book-search-submit"
                    className={`book-search-submit ${!query.trim() ? 'empty' : ''}`}
                >
                    SEARCH
                </button>

            </form>


            {loading && (
                <p className="search-status">
                    Searching...
                </p>
            )}


            {!loading &&
                !error &&
                hasSearched &&
                results.length === 0 && (
                    <p className="search-status">
                        No books found.
                    </p>
                )}


            {error && (
                <p className="search-status search-error">
                    {error}
                </p>
            )}


            <div
                ref={resultsRef}
                className="book-search-results"
            >

                {loading && (
                    <div className="search-loading-overlay">
                        Loading...
                    </div>
                )}


                <div className="book-search-result-list">

                    {results.map((book) => (
                        <article
                            key={book.key}
                            className="book-search-result"
                        >

                            {book.cover_i && (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                    alt={`${book.title} cover`}
                                    title="Cover Image"
                                />
                            )}


                            <div className="book-search-result-info">

                                <h3 title="Title">
                                    {book.title}
                                </h3>

                                <p title="Author">
                                    {book.author_name?.[0] ||
                                        'Unknown Author'}
                                </p>

                                <p title="Year">
                                    {book.first_publish_year ||
                                        'Unknown year'}
                                </p>

                            </div>


                            <button
                                className="book-search-add"
                                onClick={() =>
                                    handleAddBook(book)
                                }
                            >
                                ADD
                            </button>

                        </article>
                    ))}

                </div>


                {hasSearched && results.length > 0 && (
                    <div className="book-search-pagination">

                        <button
                            onClick={() =>
                                searchBooks(page - 1)
                            }
                            disabled={
                                page === 1 || loading
                            }
                        >
                            PREVIOUS
                        </button>

                        <span>
                            PAGE {page}
                        </span>

                        <button
                            onClick={() =>
                                searchBooks(page + 1)
                            }
                            disabled={
                                loading ||
                                page * 10 >= totalResults
                            }
                        >
                            NEXT
                        </button>

                    </div>
                )}

            </div>


            {message && (
                <p className="search-message">
                    {message}
                </p>
            )}

        </section>
    );
}

export default BookSearch;