import React, {Component} from 'react';
import Login from './Registration/Login';
import Register from './Registration/Register';
import Recipes from './Recipes/Recipes';

class MainPage extends Component{
    constructor(){
        super()
        this.state={

        }
    };

    render(){
        return(
            <div className="main-page">
                <Register />
                <Login />
                <Recipes 
                    recipes={this.props.recipes}
                />            
            </div>
        )
    }
}

export default MainPage;