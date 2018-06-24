import React, {Component} from 'react';
import SingleDish from "./SingleDish";
import axios from "axios/index";

import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import {connect} from "react-redux";


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
                    this.setState({
                        orderId: target.getAttribute("data-orderid")
                    })
                    this.props.onOrderUpdate(target.getAttribute('data-orderid'))
                    this.props.onStoreOrder(this.props.dishes)
                    //SENDING TO BACKEND
                    let userEmail = localStorage.getItem('email')
                    let orderArray = this.props.dishes
                    orderArray.forEach((element) => {
                        delete element._id
                        console.log(element)
                    })

                    const sendToBackEndData = {
                        date: this.state.currentDate,
                        email: userEmail,
                        orderNumber: target.getAttribute('data-orderid'),
                        order: orderArray
                    }

                    axios.put('http://localhost:5000/api/orderStore/' + userEmail, sendToBackEndData)
                        .then(function (response) {
                            // console.log(response);
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
        let activeCardClassName
        if (this.props.orderedMenu === String(this.props.number)) {
            activeCardClassName = 'shop-card list-items__active'
        } else {
            activeCardClassName = 'shop-card'
        }
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
