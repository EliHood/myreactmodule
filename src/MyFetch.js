import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import Radium from 'radium';
const myStyles = {
    textInput: {
        margin: '20px 0px',
        padding: '8px 0px',
        border: 'none',
        width: '300px',
        borderBottom: '1px solid black',
        outline: 'none',
        ':focus': {
            outline: 'none'
          }
    }
}
class MyFetch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            startTime: '',
            responseTime: ''
        }
    }

    componentWillMount() {
        axios
            .interceptors
            .request
            .use((config) => {
                config.metadata = {
                    startTime: Date.now()
                }
                this.setState({startTime: config.metadata.startTime})
                // console.log(config.metadata.startTime)
                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        // Add a response interceptor
        axios
            .interceptors
            .response
            .use((response) => {
                // Do something with response data
                response.config.metadata.endTime = Date.now()
                response.duration = response.config.metadata.endTime - response.config.metadata.startTime
                this.setState({responseTime: response.duration})
                console.log(this.state.responseTime)
                return response;
            }, function (error) {
                // Do something with response error
                return Promise.reject(error);
            });
    }
    // componentDidUpdate or try this
    onClick = (e) => {
        e.preventDefault();
        const url = `${this.props.url}`;
        const postData = this.props.postValue
        if (this.props.method === "GET") {
            axios
                .get(url)
                .then(res => {
                    this.setState({data: res.data})
                    console.log(this.state.data)
                })
        } else if (this.props.method === "POST") {
            axios
                .post(url, {...postData })
                .then(res => {
                    this.setState({data: res.data})
                    console.log(this.state.data)
                })
        }
    }
    render() {
        const validation = {
            validation: this.props.url.length <= 6
        }

        return (
            <div>

                {this.props.method === "POST"
                    ? (<input
                        style={myStyles.textInput}
                        value={this.props.postValue}
                        type="text"
                        disabled={validation.validation}
                        onChange={this.props.valueChange}
                        placeholder="enter a value"/>)
                    : (null)}
                <br/>
                <br/> {this.props.url
                    ? (
                        <button onClick={this.onClick}>Get Response Time</button>

                    )
                    : (null)}
                <br/>
                <br/> {this.state.responseTime
                    ? (
                        <h3>{moment(this.state.responseTime).valueOf()}ms</h3>
                    )
                    : (null)}

                {validation.validation
                    ? (
                        <h4 style={{ color:'red'}}>
                            Must enter a url
                        </h4>
                    )
                    : (null)}
            </div>
        );
    }
}
export default MyFetch;