import React, { Component } from 'react';
import './Recipe.css';

class Recipe extends Component {
    
    state ={show: true}

    render() {

        const ingredients = Object.entries(this.props.ingredients).map((x) => {
            return (<li key={x[1]}>{x[1]} - {x[0]}</li>);
        });
            
            
        return (
            <div className='Recipe'>
                <div className='Head'>
                    <h1 onClick={() => this.setState({show: !this.state.show})}>{this.props.name}</h1>
                    <button className='Delete'  onClick={this.props.remove}>X</button>
                </div>
                <ul hidden={this.state.show} >{ingredients}</ul>
                <p hidden={this.state.show}>{this.props.instructions}</p>
                <button 
                    hidden={this.state.show}
                    className='Edit'
                    onClick={this.props.edit}
                >
                    edit
                </button>
            </div>
        );
    }
}
export default Recipe;
