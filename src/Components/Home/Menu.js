import React, {Component} from 'react';
import SingleCard from './SingleCard'
import axios from "axios/index";

import {Container} from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import {connect} from "react-redux";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordered: ""
        }
    }

    getCurrentOrder() {
        const userEmail = localStorage.getItem("userEmail")
        axios.get('http://localhost:5000/api/orderStore/current/' + userEmail)
            .then((response) => {
                // console.log(response);
                this.props.onOrderUpdate(response.data.orderNumber)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillMount() {
        this.getCurrentOrder()
    }

    render() {
        const foodArray = this.props.value;
        let listItems = [];
        if (foodArray.length > 0) {
            listItems = foodArray.map((cardDishes, index) =>
                <SingleCard ordered={this.state.ordered} ordering={this.props.ordering} key={index} number={index}
                            dishes={cardDishes}/>
            )
        }
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        {listItems}
                    </Grid.Row>
                </Grid>
            </Container>
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
)(Menu);