import React, {Component} from 'react';

import SignInForm from '../Components/SignInForm'


class registration extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (

            <div className='app-background'>
                <div className='form-block-cover'>
                    <p className='form-title'>Log-In with 'Lunch Menu' app</p>
                    <SignInForm/>
                </div>
            </div>

        );
    }
}

export default registration;