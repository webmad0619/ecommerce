import React, { Component } from 'react'

export default class Searchbar extends Component {
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="filter products"
                    onChange={(e) => this.props.filterMovies(e)}
                    value={this.props.filterQuery}
                />
            </div>
        )
    }
}
