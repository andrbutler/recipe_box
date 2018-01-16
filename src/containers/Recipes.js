import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as aC from '../store/actions';
import Recipe from '../components/Recipe/Recipe';
import './Recipes.css'

class Recipes extends Component {
    
    componentWillMount() {
        this.props.getRecipes();
    }
    showChange = (event, key) => {this.show = !this.show}
    render() {
        const recipes = Object.entries(this.props.recipes).map(
            (x) => {
                return(
                    <Recipe
                     key={x[0]}
                     click={(event, input) => this.showChange(event, x[0])}
                     show={false}
                     name={x[1].name}
                     ingredients={x[1].ingredients}
                     instructions={x[1].instructions}
                     edit={(id) =>{this.props.onEdit(x[1].name)}}
                     remove={() => this.props.removeRecipe(x[1].name)}
                    />
                );
            }); 
            
        return (
            <div className="Recipes">
                {recipes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {recipes: state.recipes};
};
const mapDispatchToProps = dispatch => {
    return {
        getRecipes: () => dispatch(aC.getRecipes()),
        removeRecipe: (name) => dispatch(aC.removeRecipe(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
