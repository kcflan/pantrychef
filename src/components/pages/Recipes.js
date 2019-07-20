import React, { Component } from 'react';
import API from '../../services/API';
import Container from '../Container';
import { Link } from 'react-router-dom';
import Row from '../Row';
import Col from '../Col';
import Alert from '../Alert';
import Jumbotron from '../Jumbotron';
import RecipeCardWrapper from '../RecipeCardWrapper';
import RecipeCard from '../RecipeCard';
class Recipes extends Component {
  state = {
    result: []
  };
  componentDidMount() {
    const user = {
      userId: this.props.userid
    };

    API.getRecipes(user.userId)
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    console.log(this.state.result);
  }
  deleteRecipe = e => {
    // get the id of the recipe when 'delete' is clicked
    const thisCardsId = e.currentTarget.getAttribute('data-id');

    // delete recipe with the given id
    API.deleteRecipe(thisCardsId).then(() => {
      console.log('recipe deleted');
      this.setState(state => {
        // find which recipe to remove from state by finding the recipe in the result array that matches the clicked recipe's id

        const recipeToRemove = state.result.find(recipe => {
          return recipe.uri === thisCardsId;
        });

        // find the index of that recipe in the result array
        const indexofRecipeToRemove = state.result.indexOf(recipeToRemove);
        // then delete that one item
        state.result.splice(indexofRecipeToRemove, 1);
        // update the state
        return {
          result: state.result
        };
      });
    });
    {
      window.$('#foo').modal('open');
    }
  };
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <Jumbotron />
        <Container>
          <Row>
            <Col>
              <RecipeCardWrapper
                count={this.state.result.length}
                key={this.state.result._id}
                title={'Saved Recipes'}
                message={this.state.result === 0 ? 'No saved recipes!' : null}
              >
                {this.state.result.map(result => {
                  // console.log('hit bitches', result);

                  return (
                    // <Link to={'/api/recipesdetail/' + result._id}>
                    <RecipeCard
                      key={result._id}
                      details={result._id}
                      imgurl={result.image ? result.image : 'https://via.placeholder.com/128x193.png/000000/FFFFFF?text=No+Picture!'}
                      label={result.label}
                      uri={result.uri}
                      shareurl={result.url}
                      source={result.source}
                      yield={result.yield}
                      calories={result.calories}
                      handleRecipeDelete={this.deleteRecipe}
                      leftButton={'View'}
                      rightButton={'Delete'}
                    />
                    // </Link>
                  );
                })}
              </RecipeCardWrapper>
              <Alert modalMessage={'Recipe deleted!'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Recipes;
