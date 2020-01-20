import React from 'react';
import { connect } from 'react-redux';
import { signIn,signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '484174161955-7a14mg4iircg28gs3ea11d1e9hv0b0hm.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });;
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    }

    onSignInClik = () => {
        this.auth.signIn();
    }

    onSignOutClik = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClik} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClik} className="ui red google button">
                    <i className="google icon" />
                    Sign in with google
                </button>
            );
        }
    }

    render() {
    return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn,signOut }
)(GoogleAuth);