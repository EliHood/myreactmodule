import React, {Component} from 'react';
import axios from 'axios';
class MyFetch extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      startTime:'',
      responseTime:''
    }
  }
  componentWillMount(){
    axios.interceptors.request.use( (config) => {
      config.metadata = { startTime: Date.now()}
      this.setState({
        startTime: config.metadata.startTime
      })
      // console.log(config.metadata.startTime)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  // Add a response interceptor
  axios.interceptors.response.use( (response)  =>{
      // Do something with response data
      response.config.metadata.endTime = Date.now()
      response.duration = response.config.metadata.endTime - response.config.metadata.startTime
      this.setState({
        responseTime: response.duration
      })
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
     if(this.props.method === "GET"){
        axios.get(url).then( res => {
          this.setState({
            data: res.data
          })
          console.log(this.state.data)
        })
     }
     else if(this.props.method === "POST"){
        axios.get(url).then( res => {
          this.setState({
            data: res.data
          })
          console.log(this.state.data)
        })
     }
  }
  render(){
    return (
      <div>
        {this.props.url ? (
         <button onClick={this.onClick}>Get Response Time</button>
          ):(
              null
          )}
       {this.state.responseTime ? (
         <h3>{this.state.responseTime}</h3>
       ):(
          null
       )}
       </div>
    );
  }
}
export default MyFetch;