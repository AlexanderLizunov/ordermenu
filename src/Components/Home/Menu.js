import React, {Component} from 'react';
import SingleCard from './SingleCard'

import {Container} from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // arrayList: this.props.value
        }
    }


    render() {

        const foodArray = this.props.value;
        let listItems = [];
        // console.log(this.props.value)
        if (foodArray.length > 0) {
            listItems = foodArray.map((shop, index) =>
                <SingleCard key={index} number={index} dishes={shop}/>
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

export default Menu;