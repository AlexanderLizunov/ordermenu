import React, {Component} from 'react';

import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import SingleDish from "./SingleDish";
import {connect} from "react-redux";
import axios from "axios/index";
import BACKEND_ORDER_DATE_ORDER_STORE from "../../reducers/BACKEND_ORDER_DATE_ORDER_STORE";


class SingleCard extends Component {

    constructor(props) {
        super(props)
        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            orderId: this.props.orderMenu,
            currentDate: date
        }
    }

    handleOrder(event) {
        if (this.props.ordering === "false") {

            alert("ЗАКАЗ НЕ МОЖЕТ БЫТЬ ПРИНЯТ, ОБРАТИТЕСЬ К  АДМИНИСТРАТОРУ")
        } else {
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
                    this.props.onStoreOrder(this.props.dishes)
                    //SENDING TO BACKEND
                    let userEmail = localStorage.getItem('userEmail')
                    let orderArray = this.props.dishes
                    orderArray.forEach((element) => {
                        console.log(element)

                        delete element._id
                        console.log(element)
                    })

                    const sendToBackEndData = {
                        date: this.state.currentDate,
                        email: userEmail,
                        orderNumber: target.getAttribute('data-orderid'),
                        order: orderArray

                    }

                    console.log("sendToBackEndData")
                    console.log(sendToBackEndData)
                    axios.put('http://localhost:5000/api/orderStore/' + userEmail, sendToBackEndData)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                    return;
                }
                target = target.parentNode;
            }
        }


    }

    render() {
        console.log(this.props.ordering);
        // console.log(this.props.orderedMenu)
        // console.log(this.props.number)
        let activeCardClassName
        // if (this.props.orderDishes == this.props.number) {
        if (this.props.orderedMenu === String(this.props.number)) {
            activeCardClassName = 'shop-card list-items__active'
        } else {
            activeCardClassName = 'shop-card'
        }
        console.log("DISHES")
        console.log(this.props.dishes)
        let supplierListArray = this.props.dishes;
        let supplierList;
        supplierList = supplierListArray.map((dishes, index) =>
            <SingleDish key={index} image={dishes.image} title={dishes.title}/>
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
        BACKEND_ORDER_DATE_ORDER_STORE: state.BACKEND_ORDER_DATE_ORDER_STORE
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
