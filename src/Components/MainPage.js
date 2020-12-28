import React, {Component} from 'react';
import Recipes from './Recipes/Recipes';

class MainPage extends Component{
    constructor(){
        super()
        this.state={

        }
    };

    render(){
        return(
            <Recipes 
                recipes={this.props.recipes}
            />
        )
    }
}

export default MainPage;