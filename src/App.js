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
    this.getUsers();
  };

  getUsers(){
    fetch("https://localhost:44330/Recipes")
    .then(response => response.json())
    .then(recipesJson => this.setState({recipes: recipesJson}))
  }

  render(){
    console.log(this.state.recipes)
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
