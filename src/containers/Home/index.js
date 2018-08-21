import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from 'actions/auth';
import Button from 'components/Button';
import api from 'helpers/api';

import './styles';

// const Home = ({ checkAuth }) => {
class Home extends React.Component {
    constructor(){
        super();
        this.popoutWindow=null
        this.refresherInterval=null;
        this.openPopup = this.openPopup.bind(this)
    }
// Home = ({ checkAuth }) => {
//     let popoutWindow;
    openPopup = () => {
        if(!this.popoutWindow) {
            this.popoutWindow = window.open(api.getAuthUrl(), 'Trakt OAuth', 'width=450,height=600');
            // if(popoutWindow) {
            //     popoutWindow.onbeforeunload = popoutClosed;
                // popoutWindow.addEventListener('beforeunload', popoutClosed);
                // window.addEventListener('unload', closeWindow);
                // popoutWindow.addEventListener('unload', closeWindow);

                // myWindow.onload = function(){
                //     let content = "<button class='btn btn-primary' onclick='window.print();'>Confirm</button>";
                //     myWindow.document.getElementById('mainBody').innerHTML = content;
                // }
            // }
        }
        // let k = this.props;
        const {
            auth,
            checkAuth
        } = this.props;
        this.refresherInterval = window.setInterval(()=>{
            checkAuth()
        },3000)
        if(auth.loaded){
            window.clearInterval(this.refresherInterval)
        }
        // window.setTimeout(() => {
        //     console.log('popoutClosed')
        //     checkAuth();
        // }, 1000);
    }

    closeWindow = () => {
        alert('closeWindow')
        this.popoutWindow && this.popoutWindow.close();
        this.popoutWindow.removeEventListener('unload', closeWindow);
        this.popoutWindow = null;
    }

    popoutClosed = () => {
        alert('popoutClosed')
        window.setTimeout(() => {
            console.log('popoutClosed')
            checkAuth();
        }, 1000);
        // return null;
    }
    render(){
        const backdrops = ['iron-fist', 'sherlock', 'suits', 'sunny', 'unfortunate-events'];
        const backdrop = backdrops[Math.floor(Math.random() * backdrops.length)];
        return (
            <main className="home">
                <section className="landing">
                    <div className="background" style={{
                        backgroundImage: `url(/img/${backdrop}.webp)`
                    }}/>
                    <div className="container">
                        <h2>Automatically track the TV shows you're watching</h2>
                        <p>A client for Trakt.tv which displays your progress on current and upcoming TV shows</p>
                        <Button
                            type="primary"
                            onClick={this.openPopup}
                        >
                            Connect with Trakt.tv
                        </Button>
                    </div>
                </section>
            </main>
        );
    }
};

export default connect(
    state => ({
        auth: state.auth,
        config: state.config
    }),
    dispatch => ({
        authActions: bindActionCreators(authActions, dispatch)
    })
)(Home);
