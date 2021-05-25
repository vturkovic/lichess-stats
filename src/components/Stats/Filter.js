import React from 'react';

import Card from '../UI/Card';
import './Filter.css';

const Filter = React.memo(props => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Filter;
