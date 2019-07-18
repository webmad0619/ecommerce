import React, { Component } from 'react'

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
      movies: this.movies,
      filteredMovies: this.movies
    }
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
    let newState = {...this.state}

    newState.cart.push(movie)

    this.setState(newState)
  }

  getBasketTotal() {
    return this.state.cart.reduce((ac, cu) => ac + cu.price, 0)
  }

  render() {
    return (
      <React.Fragment>
        {/* <ShoppingCart />
        <SearchBar />
        <ProductList /> */}

        <h1>Found {this.state.filteredMovies.length} movies</h1>
        <h2>You have {this.state.cart.length} movies in your cart. Total {this.getBasketTotal()}$</h2>

        <input
          type="text"
          placeholder="filter products"
          onChange={(e) => this.filterMovies(e)}
          value={this.state.filterQuery}
        />

        <ul>
          {
            this.state.filteredMovies.map((movie) => {
              return <li key={movie.id}>{movie.name} - {movie.price}$
                <button onClick={() => this.addToCart(movie)}>Add to cart</button></li>
            })
          }
        </ul>
      </React.Fragment>
    )
  }
}