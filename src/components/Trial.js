import React, { Component } from 'react'

function Warning(props) {
    return (
        <div className="warning">*Please Fill the Amount</div>
    )
}

class Looping extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    } 
    render () {
        let loopings = this.props.todoItems.map((list,index) => {
           return (
            <div className="list">
            <Delete key={index} index={index} list={list} onRemove={this.props.deleteList}></Delete>
            </div>
           )
        });
        return (
            <div> {loopings} </div>
        )
     }
}

class Delete extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    onRemove = e =>  {
        var index = this.props.index
        this.props.onRemove(index)
        console.log('index delete', index)
    }
    render () {
        return (
            <div className='flex'>
            <div className='subFlex w95'>
                <div className='inline'> IDR </div>
                <div className='inline pull-right'> 123.434 </div>
                <p><b>IDR - Indonesian Rupiah</b></p>
                <p>1 USD = IDR 14.000,00</p>
            </div>
            <div className="subFlex cursor w5" align='center' onClick={this.onRemove}>
                &times;
            </div>
            </div>
        )
    }
}

class Trial extends Component {
  constructor(props) {
      super(props);
      this.state = {
        targetUrl: '',
        lists: [
            {resamount: '10.00',resbirth: '12',resstatus: 'Single'},
            {resamount: '13.00',resbirth: '13',resstatus: 'Married'}
        ],
        data: [],
        show: false,
        amount: '',
        defaultAmount: '10'
      }
  }

  Reset(params) {
      this.setState({
          name: '',
          birth: '',
          status: ''
      })
  }

  onSubmit = e => {
    e.preventDefault();
      
    let post = {
        resamount: this.state.amount,
        resbirth: this.state.birth,
        resstatus: this.state.status
    }
    this.state.lists.push(post)
    this.Reset()
    console.log('state', this.state.lists)
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value})
      if (e.target.value === '') {
        this.setState({
            warning: true
        })
      } else {
        this.setState({
            warning: false
        })
      }
  }

 onChangeBirth = e => {
    this.setState({ [e.target.name]: e.target.value})
 }

 fillStatus = e => {
    this.setState({ [e.target.name]: e.target.value})
    console.log('e', e)
 }

 deleteList = e => {
     var setItems = this.state.lists
     console.log('e', e)
     setItems.splice(e, 1)
     this.setState({setItems: setItems })
 }
    componentWillMount () {
      console.log('moun1')
      console.log('mounted')
      fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
    //   .then(data => this.setState({ data: data.rates}));
      .then(data => console.log('datax', data));
    }
    componentDidMount () {
        console.log('data', this.state.data)
    }

  render() {
    let Warnings;
    if (this.state.warning) {
        Warnings = <Warning />
    }
    const count = this.state.lists.map((list,index) => {
        return <option key={index} value={list.resbirth}>{list.resbirth}</option>
    })
    console.log('fa', this.state.data)
    return (
      <div id='app'>
        <div className="register">
        <form onSubmit={this.onSubmit}>
            {count} -
            <div className='flex'>
                <h4 className='w95'>USD</h4>
                <h4 className="w5">{this.state.defaultAmount}</h4>
            </div>
            <hr />
            <Looping todoItems={this.state.lists} deleteList={this.deleteList}></Looping>
            <br />
            {/* <input value={this.state.amount} type="text" placeholder="Enter Name" name="amount" onChange={this.onChange} /> */}
            <div className='flex'>
                <select className='w70' value={this.state.status} onChange={this.fillStatus} name='status'>
                    {count}
                </select>
                {Warnings}
                <button type="submit" className="registerbtn w30">
                Submit</button>
            </div>
            <button type="submit" className="registerbtn">
                + Add More Currencies</button>
        </form>
        </div>
    </div>
    )
  }
}


export default Trial;
