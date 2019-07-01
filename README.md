# example usage



#### To use 

```diff
    onChange = (e) => {
        e.preventDefault();
        this.setState({
            url: e.target.value
        })
    }
```

```diff
    valueChange = (e) => {
        e.preventDefault();

        this.setState({
            postValue: e.target.value
        })
    }
```

```diff
    onSubmit = (e) => {
        e.preventDefault();
    }

```

#### Could do POST or GET

```diff
    return (
        <div>
          <Fetch url={this.state.url}
            onChange={this.onChange}
            onSubmit={this.onSubmit} 
            postValue={this.state.postValue}
            valueChange ={this.valueChange}
            method={'POST'} 
            /> 
        </div>
    );
```


![Screenshot](https://i.ibb.co/tPnfQkt/Snip20190701-1.png)

# myreactmodule
