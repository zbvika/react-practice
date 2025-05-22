import usersFromServer from '../../api/users';

export const Header = ({
  activeOwnerId,
  setActiveOwnerId,
  query,
  setQuery,
  resetFilters,
  isNoFilterActive,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={!activeOwnerId ? 'is-active' : ''}
          onClick={() => {
            setActiveOwnerId(null);
          }}
        >
          All
        </a>

        {usersFromServer.map(owner => (
          <a
            key={owner.id}
            data-cy="FilterAllUsers"
            href="#/"
            className={activeOwnerId === owner.id ? 'is-active' : ''}
            onClick={() => {
              setActiveOwnerId(owner.id);
            }}
          >
            {owner.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          <span className="icon is-right">
            {query && (
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            )}
          </span>
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className="button is-success mr-6 is-outlined"
        >
          All
        </a>

        <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
          Category 1
        </a>

        <a data-cy="Category" className="button mr-2 my-1" href="#/">
          Category 2
        </a>

        <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
          Category 3
        </a>

        <a data-cy="Category" className="button mr-2 my-1" href="#/">
          Category 4
        </a>
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          onClick={() => {
            resetFilters();
          }}
          className={`button is-link is-fullwidth ${isNoFilterActive ? 'is-outlined' : ''}`}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
