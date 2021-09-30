import React from 'react'
import axios from 'axios'
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
export default class RecipesList extends React.Component {
    state = {
        recipe: [],
    }

    componentDidMount() {
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=YOUR_API_KEY_HERE`)
            .then(res => {
                this.setState({recipe: res.data.recipes})
            })
    }

    render() {
        return <div style={{marginTop: "10px"}}>{this.state.recipe.map(recipes => <Card sx={{margin: "auto", width: "20%", height: "20%"}} key={recipes.id}>
            <CardMedia component="img" image={recipes.image} alt='No image :('></CardMedia>
            <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Typography variant={"h5"}>{recipes.title}</Typography>

            </CardContent>

        </Card>)}</div>

    }
}