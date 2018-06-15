import React, {Component} from 'react';
import {Grid, Image} from 'semantic-ui-react'
import { List } from 'semantic-ui-react'


class SingleDish extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picked : ''
        }
    }

    render() {
        return (
            <Grid.Column width={8}>
                <List>
                    <List.Item>
                        <Image avatar src={this.props.image} />
                        <List.Content>
                            <List.Header as='a'>{this.props.title}</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>


        );
    }
}

export default SingleDish;