import React, {Component} from 'react';

import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import SingleDish from "./SingleDish";
import {connect} from "react-redux";


class Supplier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderId: ''
        }
    }

    handleOrder(event) {
        let target = event.target
        while (target !== this) {
            if (target.getAttribute("data-list-item") === 'supplier-list') {
                console.log(target.getAttribute('data-orderid'));
                let orderArray = this.props.orderDishes
                orderArray[target.getAttribute('data-orderid')] = !orderArray[target.getAttribute('data-orderid')]
                // console.log(orderArray)
                // orderArray[target.getAttribute('data-orderid')] = true
                this.props.onOrderUpdate(orderArray)
                this.setState({
                    orderId: target.getAttribute("data-orderid")
                })
                console.log(this.state)
                return;
            }
            target = target.parentNode;
        }
    }

    render() {

        // console.log(this.props.dishes.dishes)
        let activeCardClassName
        if (this.props.orderDishes[this.props.number] === true) {
            activeCardClassName = 'shop-card list-items__active'
        } else {
            activeCardClassName = 'shop-card'
        }
        let supplierListArray = this.props.dishes.dishes;
        let supplierList;
        supplierList = supplierListArray.map((dishes, index) =>
            <SingleDish key={index} image={dishes.avatar} title={dishes.firstName}/>
        );

        return (

            <Grid.Column width={8} key={this.props.number} data-orderid={this.props.number}
                         className={activeCardClassName}
                         data-list-item="supplier-list" onClick={this.handleOrder.bind(this)}>
                <List>
                    <List.Item>
                        <List.Content>
                            {supplierList}
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
        );
    }
}

export default connect(
    state => ({
        availableMenu: state.availableMenu,
        orderDishes: state.orderDishes,
    }),
    dispatch => ({
        onOrderUpdate: (array) => {
            dispatch({type: 'ORDER_UPDATE', payload: array})
        },
    })
)(Supplier);