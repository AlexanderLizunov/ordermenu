import React, {Component} from 'react';

import {Grid} from 'semantic-ui-react'
import {List} from 'semantic-ui-react'
import SingleDish from "./SingleDish";


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
            if (target.getAttribute("data-list-item") == 'supplier-list') {
                console.log(target.getAttribute('data-orderid'));
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

        console.log(this.props.dishes.dishes)

        let supplierListArray = this.props.dishes.dishes;
        let supplierList;
            supplierList = supplierListArray.map((dishes, index) =>
                <SingleDish key={index} image={dishes.avatar} title={dishes.firstName}/>
            );

        if (""+this.props.number === this.state.orderId) {
            return (

                <Grid.Column width={8} key={this.props.number} data-orderid={this.props.number}
                             className="shop-card list-items__active"
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
        } else {
            return (

                <Grid.Column width={8} key={this.props.number} data-orderid={this.props.number} className="shop-card"
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
}

export default Supplier;