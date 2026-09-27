import BookCard from '../BookCard/BookCard';

function BookList({
    books,
    totalBooks,
    onUpdateStatus,
    onToggleFavorite,
    onSelect,
    onReset,
    firstBookRef,
}) {
    if (totalBooks === 0) {
        return <p>Your library is empty. Add your first book.</p>;
    }

    if (books.length === 0) {
        return (
            <div>
                <p>No books match your current search or filters.</p>

                <button onClick={onReset}>
                    Reset Filters
                </button>
            </div>
        );
    }

    return (
        <section>
            {books.map((book, index) => (
                <BookCard
                    key={book.id}
                    book={book}
                    cardRef={index === 0 ? firstBookRef : null}
                    onUpdateStatus={onUpdateStatus}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelect}
                />
            ))}
        </section>
    );
}

export default BookList;