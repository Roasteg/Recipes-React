import React from 'react'
import axios from 'axios'

export default class RecipesList extends React.Component{
    state = {
        recipe: [],
    }
    componentDidMount() {
        axios.get('https://api.spoonacular.com/recipes/random?apiKey=YOUR API KEY HERE')
            .then(res => {
                this.setState({recipe: res.data.recipes})
            })
    }
    render(){
        return <div>{this.state.recipe.map(recipes => <div key={recipes.id}>
            {recipes.title}
            <img src={recipes.image}></img>
        </div>)}</div>

    }
}