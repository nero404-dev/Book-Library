import './LibraryStats.css';

function LibraryStats({ books }) {
    const totalBooks = books.length;

    const wantToRead = books.filter(
        (book) => book.status === 'Want to Read'
    ).length;

    const reading = books.filter(
        (book) => book.status === 'Reading'
    ).length;

    const finished = books.filter(
        (book) => book.status === 'Finished'
    ).length;

    const ratedBooks = books.filter(
        (book) => book.rating > 0
    );

    const averageRating =
        ratedBooks.length > 0
            ? (
                ratedBooks.reduce(
                    (total, book) => total + book.rating,
                    0
                ) / ratedBooks.length
            ).toFixed(1)
            : '—';

    return (
        <section className="library-stats">

            <div className="library-stats-heading">
                <p className="section-eyebrow">
                    THE COLLECTION
                </p>

                <h2>
                    Library at a glance
                </h2>
            </div>

            <div className="library-stats-grid">

                <div className="library-stat">
                    <strong>{totalBooks}</strong>
                    <span>Total Books</span>
                </div>

                <div className="library-stat">
                    <strong>{wantToRead}</strong>
                    <span>Want to Read</span>
                </div>

                <div className="library-stat">
                    <strong>{reading}</strong>
                    <span>Reading</span>
                </div>

                <div className="library-stat">
                    <strong>{finished}</strong>
                    <span>Finished</span>
                </div>

                <div className="library-stat">
                    <strong>{averageRating}</strong>
                    <span>Average Rating</span>
                </div>

            </div>

        </section>
    );
}

export default LibraryStats;