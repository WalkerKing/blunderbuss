import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile.jsx'
const props = {
    name: 'viking',
    age: 20
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            msg: 'Hello'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            msg: e.target.value
        });
    }
    render() {
        return (
            <div className="container">
                <h1>{this.state.msg}</h1>
                <input value={this.state.msg} onChange={this.handleChange} type="text"/>
                <Profile {...props} />
            </div>
        );
    }
}


const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
