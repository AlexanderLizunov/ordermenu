import React, {Component} from 'react';
import Navigation from '../Components/Navigation'

// import SingleSelect from '../Components/Admin/SingleSelect'
import SingleCard from '../Components/Admin/SingleCard'
import axios from "axios/index";


class registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList:''
        }
    }

    getList() {
        axios.get('dishes.json')
            .then((response) => {
                // this.props.onListDownload(response.data)

                // this.orderBlanker(response.data)
                this.setState({
                    dishesList: response.data
                })
                console.log(this.state.dishesList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
        this.getList()
    }


    render() {
        let cardsArray=[];
        for (let varible = 0; varible <= 3; varible++) {
           cardsArray.push(<SingleCard key={varible} card={varible} options={this.state.dishesList} />)
        }

        return (
            <div>
                <Navigation/>
                {cardsArray}
            </div>
        );
    }
}

export default registration;