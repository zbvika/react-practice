/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

const COLUMNS = ['ID', 'Product', 'Category', 'User'];

function getCategoryById(categoryId) {
  return (
    categoriesFromServer.find(category => category.id === categoryId) || null
  );
}

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const products = productsFromServer.map(product => {
  const category = getCategoryById(product.categoryId);
  const owner = category ? getUserById(category.ownerId) : null;

  return { ...product, category, owner };
});

function getVisibleProducts({ products, ownerId }) {
  return products.filter(product => {
    if (ownerId && product.owner?.id !== ownerId) {
      return false;
    }

    return true;
  });
}

export const App = () => {
  const [activeOwnerId, setActiveOwnerId] = useState(null);

  const visibleProducts = getVisibleProducts({
    products,
    ownerId: activeOwnerId,
  });

  return <div className="section">
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs has-text-weight-bold">
            <a data-cy="FilterAllUsers" href="#/" onClick={() => setActiveOwnerId(null)}>
              All
            </a>

            {usersFromServer.map(owner => {
              return (
                <a key={owner.id} data-cy="FilterAllUsers" href="#/" onClick={() => setActiveOwnerId(owner.id)}>
                  {owner.name}
                </a>
              );
            })}
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value="qwe"
              />

              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>

              <span className="icon is-right">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                />
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

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 1
            </a>

            <a data-cy="Category" className="button mr-2 my-1" href="#/">
              Category 2
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
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
              className="button is-link is-outlined is-fullwidth"
            >
              Reset all filters
            </a>
          </div>
        </nav>
      </div>

      <div className="box table-container">
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>

        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {COLUMNS.map(column => {
                return (
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
                );
              })}
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
                    product.owner?.sex === 'f'
                      ? 'has-text-danger'
                      : 'has-text-link'
                  }
                >
                  {product.owner?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
};
