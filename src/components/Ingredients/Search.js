import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFliter, searchFilter] = useState('');

  useEffect(() => {
     debugger;
    const query = enteredFliter.length === 0 ? '': `?orderBy="title"&equalTo="${enteredFliter}"`;
    console.log('query', query);
    fetch('https://react-hooks-dbab5-default-rtdb.firebaseio.com/ingredients.json' + query)
    .then(response => response.json())
    .then(responseData => {
      
      const loadedIngredients = [];
      console.log('vinay loaded', loadedIngredients);
      for(const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      debugger;
      onLoadIngredients(loadedIngredients)
    })
    
  }, [enteredFliter, onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFliter} 
            onChange={(event) => searchFilter(event.target.value) }/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
