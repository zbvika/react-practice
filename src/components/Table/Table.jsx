const COLUMNS = ['ID', 'Product', 'Category', 'User'];

export const Table = ({ visibleProducts }) => {
  if (visibleProducts.length === 0) {
    return (
      <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
    );
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <a href="#/">
                  <span className="icon">
                    <i data-cy="SortIcon" className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visibleProducts.map(product => (
          <tr key={product.id} data-cy="Product">
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>
            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {product.category?.icon} - {product.category?.title}
            </td>
            <td
              data-cy="ProductUser"
              className={
                product.owner?.sex === 'f' ? 'has-text-danger' : 'has-text-link'
              }
            >
              {product.owner?.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
