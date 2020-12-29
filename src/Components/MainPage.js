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
            <div className="main-page">
                <Recipes 
                    recipes={this.props.recipes}
                />            
            </div>
        )
    }
}

export default MainPage;