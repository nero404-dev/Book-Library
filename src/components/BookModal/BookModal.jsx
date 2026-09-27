import { useEffect, useState } from 'react';
import './BookModal.css';

function BookModal({
    book,
    onClose,
    onUpdate,
    onDelete,
    onToggleFavorite,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState('Want to Read');
    const [cover, setCover] = useState('');

    useEffect(() => {
        if (!book) return;

        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year || '');
        setRating(book.rating);
        setStatus(book.status);
        setCover(book.cover);
        setIsEditing(false);
    }, [book]);

    useEffect(() => {
        if (!book) return;

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [book, onClose]);

    if (!book) return null;

    function handleSave() {
        if (!title.trim() || !author.trim()) return;

        onUpdate({
            ...book,
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim(),
            year: year ? Number(year) : null,
            rating: Number(rating),
            status,
            cover: cover.trim(),
        });

        setIsEditing(false);
    }

    function handleCancel() {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year || '');
        setRating(book.rating);
        setStatus(book.status);
        setCover(book.cover);

        setIsEditing(false);
    }

    function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${book.title}"?`
        );

        if (!confirmed) return;

        onDelete(book.id);
        onClose();
    }

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
        >
            <div
                className="book-modal"
                onClick={(event) => event.stopPropagation()}
            >

                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    title="Close Modal"
                    aria-label="Close modal"
                >
                    ×
                </button>


                {isEditing ? (

                    <div className="book-modal-edit">

                        <div className="book-modal-heading">
                            <p className="section-eyebrow">
                                EDIT BOOK
                            </p>

                            <h2>
                                Update your book
                            </h2>
                        </div>


                        <div className="book-modal-form">

                            <label>
                                <span>Title</span>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                />
                            </label>


                            <label>
                                <span>Author</span>

                                <input
                                    type="text"
                                    value={author}
                                    onChange={(event) =>
                                        setAuthor(event.target.value)
                                    }
                                />
                            </label>


                            <label>
                                <span>Genre</span>

                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(event) =>
                                        setGenre(event.target.value)
                                    }
                                />
                            </label>


                            <div className="book-modal-form-row">

                                <label>
                                    <span>Year</span>

                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(event) =>
                                            setYear(event.target.value)
                                        }
                                    />
                                </label>


                                <label>
                                    <span>Rating</span>

                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        value={rating}
                                        onChange={(event) =>
                                            setRating(event.target.value)
                                        }
                                    />
                                </label>

                            </div>


                            <label>
                                <span>Status</span>

                                <select
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                >
                                    <option value="Want to Read">
                                        Want to Read
                                    </option>

                                    <option value="Reading">
                                        Reading
                                    </option>

                                    <option value="Finished">
                                        Finished
                                    </option>
                                </select>
                            </label>


                            <label>
                                <span>Cover URL</span>

                                <input
                                    type="url"
                                    value={cover}
                                    onChange={(event) =>
                                        setCover(event.target.value)
                                    }
                                />
                            </label>

                        </div>


                        <div className="book-modal-form-actions">

                            <button
                                type="button"
                                className="modal-primary-action"
                                onClick={handleSave}
                            >
                                SAVE CHANGES
                            </button>

                            <button
                                type="button"
                                className="modal-secondary-action"
                                onClick={handleCancel}
                            >
                                CANCEL
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="book-modal-view">

                        {book.cover && (
                            <div className="book-modal-cover">
                                <a
                                href={book.cover}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <img
                                    src={book.cover}
                                    alt={`${book.title} cover`}
                                    title="Cover Image"
                                />
                                </a>
                            </div>
                        )}


                        <div className="book-modal-details">

                            <p className="book-modal-eyebrow">
                                BOOK DETAILS
                            </p>

                            <h2 className="book-modal-title">
                                {book.title || 'Unknown'}
                            </h2>

                            <p className="book-modal-author">
                                {book.author || 'Unknown'}
                            </p>


                            <div className="book-modal-meta">

                                <div>
                                    <span>GENRE</span>
                                    <strong>
                                        {book.genre || 'Unknown'}
                                    </strong>
                                </div>

                                <div>
                                    <span>YEAR</span>
                                    <strong>
                                        {book.year || 'Unknown'}
                                    </strong>
                                </div>

                                <div>
                                    <span>RATING</span>
                                    <strong>
                                        {book.rating || '—'} / 5
                                    </strong>
                                </div>

                                <div>
                                    <span>STATUS</span>
                                    <strong>
                                        {book.status || 'Unset'}
                                    </strong>
                                </div>

                            </div>


                            <div className="book-modal-actions">

                                <button
                                    type="button"
                                    onClick={() =>
                                        onToggleFavorite(book.id)
                                    }
                                >
                                    {book.favorite
                                        ? 'UNFAVORITE'
                                        : 'FAVORITE'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                >
                                    EDIT
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    DELETE
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </div>
    );
}

export default BookModal;