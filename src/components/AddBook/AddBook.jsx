import { useState } from 'react';
import './AddBook.css';

function AddBook({ onAddBook }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState('Want to Read');
    const [cover, setCover] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim() || !author.trim()) return;

        const newBook = {
            id: Date.now(),
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim(),
            year: year ? Number(year) : null,
            rating: Number(rating),
            status,
            cover: cover.trim(),
            createdAt: Date.now(),
            favorite: false,
        };

        const added = onAddBook(newBook);

        if (!added) {
            setMessage('This book is already in your library.');
            return;
        }

        setMessage('Book added successfully.');

        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setRating(0);
        setStatus('Want to Read');
        setCover('');
    }

    return (
        <section className="manual-add">

            <div className="manual-add-heading">

                <p className="section-eyebrow">
                    MANUAL ENTRY
                </p>

                <h2>
                    Add a book yourself
                </h2>

            </div>


            <form
                className="manual-add-form"
                onSubmit={handleSubmit}
            >

                <div className="manual-add-grid">

                    <input
                        type="text"
                        placeholder="Book title"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(event) =>
                            setGenre(event.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Publication year"
                        value={year}
                        onChange={(event) =>
                            setYear(event.target.value)
                        }
                    />

                    <input
                        type="number"
                        min="0"
                        max="5"
                        placeholder="Rating"
                        value={rating}
                        onChange={(event) =>
                            setRating(event.target.value)
                        }
                    />

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

                    <input
                        type="url"
                        placeholder="Cover URL"
                        value={cover}
                        onChange={(event) =>
                            setCover(event.target.value)
                        }
                    />

                </div>


                <button
                    type="submit"
                    className="manual-add-submit"
                >
                    ADD BOOK
                </button>


                {message && (
                    <p className="manual-add-message">
                        {message}
                    </p>
                )}

            </form>

        </section>
    );
}

export default AddBook;