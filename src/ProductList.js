import React, { Component } from 'react'

export default class ProductList extends Component {
    render() {
        return (
            <ul>
            {
              this.props.filteredMovies.map((movie) => {
                return <li key={movie.id}>{movie.name} - {movie.price}$
                  <button onClick={() => this.props.addToCart(movie)}>Add to cart</button></li>
              })
            }
          </ul>
        )
    }
}
