import './BookCard.css';

function BookCard({
    book,
    // onUpdateStatus,
    onToggleFavorite,
    onSelect,
    cardRef
}) {
    return (
        <article
            ref={cardRef}
            className="book-card"
            onClick={() => onSelect(book)}
        >
            {book.cover && (
                <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    title="Cover Image"
                />
            )}

            <h2 title="Title">{book.title || 'Unknown'}</h2>

            <p title="Author">{book.author || 'Unknown'}</p>

            <p title="Genre">{book.genre || 'Unknown'}</p>

            <p title="Year">{book.year || 'Unknown'}</p>

            <p title="Rating">{book.rating || '—'} / 5</p>

            <p title="Status">Status: {book.status || 'Unset'}</p>

            {/* <select
                title="Status"
                value={book.status || 'Unset'}
                onChange={(event) => {
                    event.stopPropagation();
                    onUpdateStatus(
                        book.id,
                        event.target.value
                    );
                }}
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
            </select> */}

            <div>
                <button
                    title="Favorite"
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleFavorite(book.id);
                    }}
                >
                    {book.favorite ? '★' : '☆'}
                </button>
            </div>
        </article>
    );
}

export default BookCard;