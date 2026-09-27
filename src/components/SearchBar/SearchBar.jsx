import './SearchBar.css';

function SearchBar({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
    genreFilter,
    onGenreChange,
    genres,
    favoriteFilter,
    onFavoriteChange,
    sortBy,
    onSortChange,
    onReset,
}) {
    return (
        <section className="library-controls">

            <div className="library-controls-heading">
                <p className="section-eyebrow">
                    BROWSE COLLECTION
                </p>

                <h2>
                    Find something to read
                </h2>
            </div>

            <div className="library-search">
                <input
                    type="search"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                />
            </div>

            <div className="library-filters">

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        onStatusChange(event.target.value)
                    }
                >
                    <option value="All">
                        All Statuses
                    </option>

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

                <select
                    value={genreFilter}
                    onChange={(event) =>
                        onGenreChange(event.target.value)
                    }
                >
                    <option value="All">
                        All Genres
                    </option>

                    {genres.map((genre) => (
                        <option
                            key={genre}
                            value={genre}
                        >
                            {genre}
                        </option>
                    ))}
                </select>

                <select
                    value={favoriteFilter}
                    onChange={(event) =>
                        onFavoriteChange(event.target.value)
                    }
                >
                    <option value="All">
                        All Books
                    </option>

                    <option value="Favorites">
                        Favorites
                    </option>
                </select>

                <select
                    value={sortBy}
                    onChange={(event) =>
                        onSortChange(event.target.value)
                    }
                >
                    <option value="recent">
                        Recently Added
                    </option>

                    <option value="title-asc">
                        Title A → Z
                    </option>

                    <option value="title-desc">
                        Title Z → A
                    </option>

                    <option value="rating-desc">
                        Rating High → Low
                    </option>

                    <option value="year-desc">
                        Newest → Oldest
                    </option>
                </select>

                <button
                    type="button"
                    className="library-reset"
                    onClick={onReset}
                >
                    RESET FILTERS
                </button>

            </div>

        </section>
    );
}

export default SearchBar;