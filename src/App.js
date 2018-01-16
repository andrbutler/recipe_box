import React, { Component } from 'react';
import './App.css';
import Recipes from './containers/Recipes';
import AddRecipe from './containers/AddRecipe/AddRecipe';
import Modal from './components/UI/Modal/Modal';

class App extends Component {
    state = {
        edit: false,
        currentEdit: '',
        adding: false
    }

    editHandler = (id) => {
        this.setState({edit: true, currentEdit: id});
    }

    closeHandler = (id) => {
        this.setState({edit: false, currentEdit: '', adding: false});
    }

    render() {
        let controls = null;
        if (this.state.edit) {
            let recipes = JSON.parse(localStorage.getItem('recipes'));
            let input = recipes[this.state.currentEdit];
            controls = (
                <AddRecipe 
                    edit
                    inputName ={this.state.currentEdit}
                    inputInstructions={input.instructions}
                    inputIngredients={input.ingredients}
                    close={this.closeHandler}
                />
            );
        } else if (this.state.adding) {
            controls = <AddRecipe close={this.closeHandler} />;
        }

        return (
            <div className="App">
                <h1 className='Title'>Recipe Box</h1>
                <Recipes onEdit={(id) => this.editHandler(id)}/> 
                {controls}
                {this.state.adding || this.state.edit
                    ? <Modal /> 
                    : <button className='NewRecipe' onClick={() => this.setState({adding: true})}>
                        New Recipe
                    </button>
                }
            </div>
        );
    }
}

export default App;
