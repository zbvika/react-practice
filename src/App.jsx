/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { Table } from './components/Table';
import { Header } from './components/Header';

function getCategoryById(categoryId) {
  return (
    categoriesFromServer.find(category => category.id === categoryId) || null
  );
}

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const products = productsFromServer.map(product => {
  const category = getCategoryById(product.categoryId);
  const owner = category ? getUserById(category.ownerId) : null;

  return { ...product, category, owner };
});

function getVisibleProducts(allProducts, { ownerId, query }) {
  return allProducts.filter(product => {
    if (ownerId && product.owner?.id !== ownerId) {
      return false;
    }

    if (query) {
      return product.name.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  });
}

export const App = () => {
  const [activeOwnerId, setActiveOwnerId] = useState(null);
  const [query, setQuery] = useState('');

  const visibleProducts = getVisibleProducts(products, {
    ownerId: activeOwnerId,
    query,
  });

  const resetFilters = () => {
    setActiveOwnerId(null);
    setQuery('');
  };

  const isNoFilterActive = !activeOwnerId && query.trim() === '';

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Header
            activeOwnerId={activeOwnerId}
            setActiveOwnerId={setActiveOwnerId}
            query={query}
            setQuery={setQuery}
            resetFilters={resetFilters}
            isNoFilterActive={isNoFilterActive}
          />
        </div>

        <div className="box table-container">
          <Table visibleProducts={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
