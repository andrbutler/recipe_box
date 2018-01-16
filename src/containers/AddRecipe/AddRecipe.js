import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as aC from '../../store/actions';
import './AddRecipe.css';

const defaultState = {
    name: {
        type: 'text',
        value: '',
        placeHolder: 'recipe name',
        label: 'recipe'
    },
    instructions: {
        type: 'textarea',
        value: '',
        placeHolder: 'instructions',
        label: 'instructions'
    },
    ingredients: {},
    current: {
        amount: '', 
        name: ''
    }
}
class AddRecipe extends Component {
    state = {...defaultState } 

    componentWillMount() {
        if (this.props.edit) {
            this.setState({
                name: {
                    type: this.props.inputName,
                    value: this.props.inputName,
                    placeHolder: this.props.inputName,
                    label: 'recipe'
                },
                instructions: {
                    type: this.props.inputInstructions,
                    value: this.props.inputInstructions,
                    placeHolder: this.props.inputInstructions,
                    label: 'instructions'
                },
                ingredients: this.props.inputIngredients,
                current: {
                    amount: '', 
                    name: ''
                }
            });
        }
    }

    changeHandler = (event, id) => {
        let updatedState = {...this.state};
        let updatedElement = {...updatedState[id]}
        updatedElement.value = event.target.value;
        updatedState[id] = updatedElement;
        this.setState(updatedState);
    }

    addIngredient = (event) => {
        event.preventDefault();
        
        let newIngredients = {...this.state.ingredients,
        [this.state.current.name]: this.state.current.amount};
        this.setState({ingredients : newIngredients, current: {amount: '', name: ''}});
    }

    removeIngredient = (event, x) => {
        event.preventDefault();
        let newIngredients = {...this.state.ingredients};
        delete newIngredients[x];
        this.setState({ingredients : newIngredients});
    }
    
    cancelHandler = (event) => {
        event.preventDefault();
        this.setState(defaultState);
        this.props.close();
    }

    render() { 
        
        let ingredients = null
        if (this.state.ingredients) {
            let toParse = [];
            for (let i in this.state.ingredients) {
                toParse.push({[this.state.ingredients[i]]: i})
            }
            ingredients= toParse.map( (x, ind) => {
                let y = Object.keys(x);
                let z = x[y];
                return(
                    <h2 key={z} onClick={(event, input) =>
                    this.removeIngredient(event, z)}>
                        {y}  :  {z}
                    </h2>
                );
            });
        }
        
        let subButton = (
                <button 
                className='SubButton'
                onClick={(event) => {
                    event.preventDefault(); 
                    this.props.addRecipe(
                        this.state.name.value, 
                        this.state.instructions.value, 
                        this.state.ingredients
                    );
                    this.cancelHandler(event);
                    }}>submit</button>
                );
        if (this.props.edit) {
            subButton = (
                    <button 
                    className='SubButton'
                    onClick={(event) => {
                        event.preventDefault(); 
                        this.props.editRecipe(
                            this.props.inputName,
                            this.state.name.value, 
                            this.state.instructions.value, 
                            this.state.ingredients
                        );
                        this.cancelHandler(event);
                        }}>submit</button>
                    );

        }
        return (
            <div>
                <form className='AddRecipe'>
                    <input 
                     type={this.state.name.type}
                     className='Name'
                     key={this.state.name} 
                     value={this.state.name.value} 
                     placeholder={this.state.name.placeHolder} 
                     label={this.state.name.label}
                     onChange={(event) => this.changeHandler(event, 'name')}
                    />
                    <textarea 
                     className='Instructions'
                     value={this.state.instructions.value} 
                     placeholder={this.state.instructions.placeHolder} 
                     label={this.state.instructions.label}
                     onChange={(event) => this.changeHandler(event, 'instructions')}
                    />
                    <h2> Add a new ingredient here:</h2>
                    <input value={this.state.current.amount}
                     placeholder='amount'
                     className='Ingredient'
                     onChange={(event) => {this.setState(
                     {current: {amount: event.target.value, name: this.state.current.name}}
                     )}}/>
                    <input value={this.state.current.name}
                     placeholder='ingredient'
                     className='Ingredient'
                     onChange={(event) => {this.setState(
                     {current: {amount: this.state.current.amount, name: event.target.value}}
                     )}}/>
                    <button 
                    className='AddButton'
                    onClick={this.addIngredient}
                    >
                        add ingredient
                    </button>
                     <h2>current ingredients(click to remove):</h2>
                    {ingredients}
                    {subButton}
                    <button 
                    className='CancelButton'
                    onClick={this.cancelHandler}
                    >
                        cancel
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRecipe: (name, instructions, ingredients) => {
            return dispatch(aC.addRecipe(name, instructions, ingredients))
        },
        editRecipe: (inputName, name, instructions, ingredients) => {
            return dispatch(aC.editRecipe(inputName, name, instructions, ingredients))
        }
    }
};

export default connect(null, mapDispatchToProps)(AddRecipe);
