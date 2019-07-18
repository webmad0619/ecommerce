import React, { Component } from 'react'
import Searchbar from './Searchbar';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import axios from "axios";

export default class App extends Component {
  movies = [
    {
      id: 1,
      name: 'The Shawshank Redemption',
      year: '1994',
      director: 'Frank Darabont',
      duration: '2h 22min',
      genre: ['Crime', 'Drama'],
      rate: '9.3',
      price: 20
    },
    {
      id: 2,
      name: 'The Godfather',
      year: '1972',
      director: 'Francis Ford Coppola',
      duration: '2h 55min',
      genre: ['Crime', 'Drama'],
      rate: '9.2',
      price: 25
    },
    {
      id: 3,
      name: 'The Godfather: Part II',
      year: '1974',
      director: 'Francis Ford Coppola',
      duration: '3h 22min',
      genre: ['Crime', 'Drama'],
      rate: '9.0',
      price: 23
    },
    {
      id: 4,
      name: 'The Dark Knight',
      year: '2008',
      director: 'Christopher Nolan',
      duration: '2h 32min',
      genre: ['Action', 'Crime', 'Drama', 'Thriller'],
      rate: '9.0',
      price: 21
    },
    {
      id: 5,
      name: '12 Angry Men',
      year: '1957',
      director: 'Sidney Lumet',
      duration: '1h 36min',
      genre: ['Crime', 'Drama'],
      rate: '8.9',
      price: 30
    },
    {
      id: 6,
      name: 'Schindler\'s List',
      year: '1993',
      director: 'Steven Spielberg',
      duration: '3h 15min',
      genre: ['Biography', 'Drama', 'History'],
      rate: '8.9',
      price: 41
    }
  ]

  constructor() {
    super();

    this.state = {
      filterQuery: "",
      cart: [],
      movies: [],
      filteredMovies: []
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:6969/movies")
      .then(movies => {
        this.movies = movies.data

        this.setState({
          ...this.state,
          filterQuery: "",
          cart: [],
          movies: movies.data,
          filteredMovies: movies.data
        })
      })
  }

  filterMovies(e) {
    const filter = e.target.value
    let filteredMovies = this.state.movies.filter((movie) => {
      return movie.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    })

    this.setState({
      ...this.state,
      filterQuery: filter,
      filteredMovies: filteredMovies
    })
  }

  addToCart(movie) {
    let newState = { ...this.state }

    newState.cart.push(movie)

    this.setState(newState)
  }

  getCartTotal() {
    return this.state.cart.reduce((ac, cu) => ac + cu.price, 0)
  }

  removeProductFromBasket(movieID) {
    let newState = { ...this.state }
    let cartItemIndex = 0;

    for (var i = 0; i < newState.cart.length; i++) {
      if (newState.cart[i].id === movieID) {
        cartItemIndex = i;
      }
    }
    newState.cart.splice(cartItemIndex, 1)

    this.setState(newState)
  }

  render() {
    return (
      <React.Fragment>
        <ShoppingCart
          cart={this.state.cart}
          getCartTotal={() => this.getCartTotal()}
          removeProductFromBasket={(movieID) => this.removeProductFromBasket(movieID)} />
        <h1>Found {this.state.filteredMovies.length} movies</h1>

        <Searchbar
          filterMovies={(e) => this.filterMovies(e)}
          filterQuery={this.state.filterQuery} />


        <ProductList
          filteredMovies={this.state.filteredMovies}
          addToCart={(movie) => this.addToCart(movie)} />

      </React.Fragment>
    )
  }
}