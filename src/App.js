import React, {Component} from 'react';
import axios from 'axios';
import './App.css'

import Menu from './Components/Menu';
import Navigation from "./Components/Navigation";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picked: false,
            food: ''
        }
    }

    componentWillMount() {
        this.getText()
    }

    getText() {
        axios.get('clients.json')
            .then((response) => {
                this.setState({
                        food: response.data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="App">
                <Navigation/>
                <Menu value={this.state.food}/>
            </div>
        );
    }
}

export default App;
