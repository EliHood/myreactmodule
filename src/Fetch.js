import React, {Component} from 'react';
import MyFetch from './MyFetch';
const Fetch = (props) => (
     <div>
       <form onSubmit={props.onSubmit}>
            <input type="text" value={props.url} placeholder="enter a url" onChange={props.onChange}/>
        </form>
          <MyFetch url={props.url} method={props.method}/>
     </div>
)
export default Fetch;
