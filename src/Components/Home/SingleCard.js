import React, {Component} from 'react';

import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import SingleDish from "./SingleDish";
import {connect} from "react-redux";


class SingleCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderId: this.props.orderMenu
        }
    }

    handleOrder(event) {
        let target = event.target
        while (target !== this) {
            if (target.getAttribute("data-list-item") === 'supplier-list') {
                console.log(target.getAttribute('data-orderid'));
                // let orderArray = this.props.orderDishes
                // orderArray[target.getAttribute('data-orderid')] = !orderArray[target.getAttribute('data-orderid')]
                // console.log(orderArray)
                // orderArray[target.getAttribute('data-orderid')] = true


                this.props.onOrderUpdate(target.getAttribute('data-orderid'))
                this.setState({
                    orderId: target.getAttribute("data-orderid")
                })
                // console.log(this.state)
                // console.log(this.props.dishes)
                //TODO LATER SEND TO BACKEND
                this.props.onStoreOrder(this.props.dishes.dishes)
                return;
            }
            target = target.parentNode;
        }
    }

    render() {

        // console.log(this.props.orderedMenu)
        // console.log(this.props.number)
        let activeCardClassName
        // if (this.props.orderDishes == this.props.number) {

        if (this.props.orderedMenu == this.props.number) {
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
        orderedMenu: state.orderedMenu,
        currentDate: state.currentDate,
        BACKEND_ORDER_DATE_ORDER_STORE: state.BACKEND_ORDER_DATE_ORDER_STORE,
    }),
    dispatch => ({
        onOrderUpdate: (array) => {
            dispatch({type: 'ORDER_UPDATE', payload: array})
        },
        onStoreOrder: (array) => {
            dispatch({type: 'BACKEND_ORDER_STORE_UPDATE', payload: array})
        },
    })
)(SingleCard);
