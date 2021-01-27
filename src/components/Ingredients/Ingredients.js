import React, { useState, useEffect, useCallback} from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () =>  {
  const [ingredients, setIngredients] = useState([]);
  console.log('ingredients', ingredients);
   useEffect(() => {
 
     fetch('https://react-hooks-dbab5-default-rtdb.firebaseio.com/ingredients.json')
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
       setIngredients(loadedIngredients)
     })
     
   }, []);

   const filteredIngredients = useCallback(filteredIngredient => {
     debugger;
     console.log("filteredIngredient",filteredIngredient);
    setIngredients(filteredIngredient);
   },[])
  const addIngredients = (ingredients) => {
    fetch('https://react-hooks-dbab5-default-rtdb.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-type': 'application/json'}
     
    }).then(response => {
      console.log('response', response);
      return response.json()
    }).then(responseData => {
      console.log('responseData', responseData);
      setIngredients(previousIngredients => [
        ...previousIngredients,
        {id: responseData.name, ...ingredients}
      ])
    }) 
  }
  return (
    <div className="App">
      <IngredientForm addIngredients = {addIngredients}/>

      <section>
        <Search  onLoadIngredients={filteredIngredients}/>
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
