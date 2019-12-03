import React, {Component} from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { registerUser, updateState, loginUser } from '../../redux/AuthReducer/AuthReducer';


class Home extends Component {

    handleChange = e => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    clickRegister = async e => {
        e.preventDefault();
        await this.props.registerUser(this.props.username, this.props.password);
        this.props.history.push('/posts');
    }

    clickLogin = async e => {
        e.preventDefault();
        await this.props.loginUser(this.props.username, this.props.password);
        this.props.history.push('/posts')
    }

    render() {
        console.log(this.props.user)
        return(
            <div>
                <form type='submit'>
                    <h1>Helo</h1>
                    <input name='username' placeholder='Username' onChange={this.handleChange} />
                    <input name='password' placeholder='Password' onChange={this.handleChange} />
                    <button onClick={this.clickLogin}>Login</button>
                    <button onClick={this.clickRegister}>Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.authReducer.username,
        password: reduxState.authReducer.password,
        // img: reduxState.authReducer.user.img,
        user: reduxState.authReducer.user
    }
}

export default connect(mapStateToProps, { registerUser, updateState, loginUser })(Home);