import React, { Component } from 'react'
import "./ShoppingCart.css"

export default class ShoppingCart extends Component {
    state = {
        open: false
    }

    buy () {
        console.warn("I am going to send to the microservice this info:")
        console.log(JSON.stringify(this.props.cart.map(movie => movie.id)))
    }

    toggleItems() {
        if (this.props.cart.length === 0)   {
            alert("no puedes abrir el carrito no tiene items!")
            return;
        }

        const open = this.state.open

        this.setState({
            ...this.state,
            open: !open
        })
    }
    render() {
        return (
            <aside className="shopping-cart">
                <h2>Total {this.props.getCartTotal()}$</h2>

                <div className={(this.props.cart.length  === 0 ? "cart-button disabled" : "cart-button")} onClick={() => this.toggleItems()}>
                    {
                        this.props.cart.length > 0 && <span className="notification">{this.props.cart.length}</span>
                    }
                    
                </div>

                {
                    this.state.open &&
                    <ul className="cart-list">
                        {
                            this.props.cart.map((cartItem) => <li key={cartItem.id}>{cartItem.name} {cartItem.price} $ <button onClick={() => this.props.removeProductFromBasket(cartItem.id)}>X</button></li>)
                        }
                        <li key="9999999999999999"><button onClick={() => this.buy()}  style={{"color": "red"}}>Buy! :)</button></li>

                        {/* {
                            //remember this is achieved by the toggleItems fn without this conditional rendering
                            this.props.cart.length > 0 && <li key="9999999999999999"><button onClick={() => this.buy()}>Buy! :)</button></li>
                        } */}
                    </ul>
                }
            </aside>
        )
    }
}
