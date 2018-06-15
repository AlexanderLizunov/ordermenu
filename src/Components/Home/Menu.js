import React, {Component} from 'react';
import Supplier from './SingleCard'

import {Container} from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayList: this.props.value
        }
    }



    render() {

        let foodArray = this.props.value;
        let listItems = [];
        if (foodArray.length > 0) {

            listItems = foodArray.map((shop, index) =>
                <Supplier key={index} number={index} dishes={shop}  />
            )
            // console.log(listItems)
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

export default Menu;