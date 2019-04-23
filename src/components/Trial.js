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
            <div className="list" key={index}>
                <Delete index={index} list={list} onRemove={this.props.deleteList}></Delete>
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
    }
    render () {
        return (
            <div className='flex'>
            <div className='subFlex w95'>
                <div className='inline'> {this.props.list.currency} </div>
                <div className='inline pull-right'> {this.props.list.amount} </div>
                <p><b>{this.props.list.currency} - Indonesian Rupiah</b></p>
                <p>1 USD = {this.props.list.currency} {this.props.list.defaultAmount}</p>
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
            {currency: 'IDR', amount: '100', defaultAmount: '1200'}
        ],
        data: [],
        show: false,
        currency: '',
        amount: '',
        defaultAmount: '',
      }
  }

  Reset(params) {
      this.setState({
        currency: '',
        amount: '',
        defaultAmount: ''
      })
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('now', this.state.defaultAmount)
    let post = {
        currency: this.state.currency,
        amount: this.state.amount,
        defaultAmount: this.state.defaultAmount
    }
    this.state.lists.push(post)
    this.Reset()
  }

  onChange = e => {
      console.log('etarget', e)
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
    console.log('value', e.target.value)
    console.log('value', e.target.name)
 }

 deleteList = e => {
     var setItems = this.state.lists
     setItems.splice(e, 1)
     this.setState({setItems: setItems })
 }
    componentWillMount () {
      fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
      .then(data => this.setState({ data: Object.entries(data.rates)}));
    //   .then(data => console.log('datax', data));
    }

  render() {
    let Warnings;
    if (this.state.warning) {
        Warnings = <Warning />
    }
    const count = this.state.data.map((list,index) => {
        return <option key={index} value={list[1]}>{list[0]}</option>
    })
    return (
      <div id='app'>
        <div className="register">
        <form onSubmit={this.onSubmit}>
            <div className='flex'>
                <h4 className='w95'>USD</h4>
                <h4 className="w5">{this.state.amount}</h4>
            </div>
            <hr />
            <Looping todoItems={this.state.lists} deleteList={this.deleteList}></Looping>
            <br />
            {/* <input value={this.state.amount} type="text" placeholder="Enter Name" name="amount" onChange={this.onChange} /> */}
            <div className='flex'>
                <select className='w70' value={this.state.defaultAmount} onChange={this.fillStatus} name='defaultAmount'>
                    {count}
                </select>
                {Warnings}
                <button type="submit" className="registerbtn w30">
                Submit</button>
            </div>
            {/* <button type="submit" className="registerbtn">
                + Add More Currencies</button> */}
        </form>
        </div>
    </div>
    )
  }
}


export default Trial;
