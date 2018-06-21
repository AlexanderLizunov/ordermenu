import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import RegistrationForm from '../Components/Registration/RegistrationForm'


class registration extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='app-background'>
                <div className='form-block-cover'>
                    <p className='form-title'>Register with 'Lunch Menu' app</p>
                    <RegistrationForm/>
                    <p className='form-footer'> You already have account? Please, <Link to="/login">sign in</Link>}</p>
                </div>
            </div>
        );
    }
}

export default registration;