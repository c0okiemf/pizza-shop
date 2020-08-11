import React, {Component} from "react"
import Order from "./Order"
import styled from "styled-components"

const OrdersContainer = styled.div`
  display: grid;
  place-items: center;
  grid-gap: 2rem;
`

class Orders extends Component {

    render = () => (
        <OrdersContainer>
            {this.props.orders.length > 0 &&
                this.props.orders.map((order, i) => (
                        <Order key={i} order={order} />
                    )
            )}
        </OrdersContainer>
    )

}

export default Orders
