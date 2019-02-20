import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_conf: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            password_conf: this.state.password_conf
        };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render(){
        const  err  = this.state.errors;
        return(
            <React.Fragment>
                {err.error &&
                <div className="row">
                    <div className="col-xs-6">
                        <div className="alert alert-danger">
                            {err.error}
                        </div>
                    </div>
                </div>
                }
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                name="email"
                                onChange={ this.handleInputChange }
                                value={ this.state.name }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                name="password"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password Confirm"
                                className="form-control"
                                name="password_conf"
                                onChange={ this.handleInputChange }
                                value={ this.state.password_conf }
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register User
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))