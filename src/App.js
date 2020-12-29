import React, {Component} from 'react';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state={
      recipes: []
    }
  };

  componentDidMount(){
    this.getRecipes();
  };

  getRecipes(){
    fetch("https://localhost:44330/Recipes")
    .then(response => response.json())
    .then(recipesJson => this.setState({recipes: recipesJson}))
    .catch(error => error);
  }

  render(){
    // console.log(this.state.recipes)
    // for(let i = 0; i < this.state.recipes.length; i++){
    //   console.log(this.state.recipes[i].image.id)
    // }
    return(
      <div className="App">
        <NavigationBar />
        <MainPage 
          recipes={this.state.recipes}
        />
      </div>
    )
  }
}

export default App;
