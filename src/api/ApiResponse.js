import React from 'react'
import axios from 'axios'
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import firebase from 'firebase';

const user = firebase.auth().currentUser;
const db = firebase.database();
export default class RecipesList extends React.Component {
    state = {
        recipe: [],
        recipeId: null,
        userId: null
    }
    addToFavourites = () => {
        const recipeRef = db.ref("favourites");
        const favRecipe = recipeRef.push();
        favRecipe.set({
            currentUser: this.state.userId,
            currentRecipe: this.state.recipeId
        })
    }
    handleClick = (e, data) => {
        e.preventDefault();
        this.state.recipeId = data;
        this.state.userId = user.uid;
        this.addToFavourites(e)
    }


    componentDidMount() {
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=YOUR_API_KEY_HERE`)
            .then(res => {
                this.setState({recipe: res.data.recipes})
            })
    }

    render() {
        return <div>{this.state.recipe.map(recipes => <Card
            sx={{margin: "auto", marginTop: "10px", width: "20%", height: "20%"}}
            key={recipes.id}>
            <CardMedia component="img" image={recipes.image} alt='No image :('></CardMedia>
            <CardContent>
                <Typography variant={"h5"}>{recipes.title}</Typography>
            </CardContent>
            <CardActions sx={{m: 0}}>
                <IconButton value={recipes.id}
                            onClick={((e) => this.handleClick(e, recipes.id))}><FavoriteBorderIcon ></FavoriteBorderIcon></IconButton>
            </CardActions>

        </Card>)}</div>

    }
}