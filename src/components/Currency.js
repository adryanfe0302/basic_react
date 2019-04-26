import React, { Component } from 'react'


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
            <div className='w95'>
                <div className='bigFont inline'> {this.props.list.currency} </div>
                <div className='bigFont inline pull-right'> {this.props.list.amount} </div>
                <p><b>{this.props.list.currency} - {this.props.list.currencyName}</b></p>
                <p className='smallFont'>1 USD = {this.props.list.currency} {this.props.list.defaultAmount}</p>
            </div>
            <div className="subFlex cursor w30" align='right' onClick={this.onRemove}>
                &times;
            </div>
            </div>
        )
    }
}

class Currency extends Component {
  constructor(props) {
      super(props);
      this.state = {
        lists: [],
        data: [],
        show: false,
        currency: '',
        amount: '10',
        defaultAmount: '',
      }
  }

  Reset(params) {
      this.setState({
        currency: '',
        defaultAmount: '',
      })
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('am', this.state.amount)
    let resValue = this.state.defaultAmount
    let calValue = this.state.amount * this.state.defaultAmount.substr(4, this.state.defaultAmount.length)

    let currencyName = ''
    let currencyValue = resValue.substr(0,3)
    if (currencyValue === 'IDR') {
        currencyName = 'Indonesian Rupiah'
    } else if (currencyValue === 'EUR')  {
        currencyName = 'Euro'
    } else if (currencyValue === 'GDB')  {
        currencyName = 'British Pound'
    } else if (currencyValue === 'INR')  {
        currencyName = 'Indian Rupee'
    } else if (currencyValue === 'AUD')  {
        currencyName = 'Australian Dollar'
    } else if (currencyValue === 'CAD')  {
        currencyName = 'Canadian Dollar'
    } else if (currencyValue === 'SGD')  {
        currencyName = 'Singapore Dollar'
    } else if (currencyValue === 'JPY')  {
        currencyName = 'Japanese Yen'
    } else if (currencyValue === 'MYR')  {
        currencyName = 'Malaysian Ringgit'
    } else {
        // ect
        currencyName = ''
    }

    let post = {
        currency: resValue.substr(0,3),
        currencyName: currencyName,
        amount: calValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        // amount: calValue,
        defaultAmount: resValue.substr(4, resValue.length),
    }
    this.state.lists.push(post)
    this.Reset()
  }

  onChange = e => {
      console.log('e', e.target)
      this.setState({ [e.target.name]: e.target.value})
      this.setState({ amount: e.target.value})
      let list = this.state.lists
      this.state.data.forEach(x => {
         list.forEach((xx,ii) => {
             if(x[0] === xx.currency) {         
                 let curValue =  e.target.value * xx.defaultAmount
                 xx.amount = curValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
             }
         })
      })
      this.setState({lists: list})
  }

 onChangeBirth = e => {
    this.setState({ [e.target.name]: e.target.value})
 }

 fillStatus = e => {
    this.setState({ [e.target.name]: e.target.value})
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
 }

  render() {
    const count = this.state.data.map((list,index) => {
        return <option key={index} value={list}>{list[0]}</option>
    })
    return (
      <div id='app'>
        <div className="register">
        <form onSubmit={this.onSubmit}>
            <div className='flex'>
                <h4 className='w70'>USD</h4>
                <div className="w30">
                    <input value={this.state.amount} type="text" placeholder="Enter Name" name="amount" onChange={this.onChange} />
                </div>
            </div>
            <hr />
            <Looping todoItems={this.state.lists} deleteList={this.deleteList}></Looping>
            <br />
            <div className='flex'>
                <select className='w70' value={this.state.defaultAmount} onChange={this.fillStatus} name='defaultAmount'>
                    {count}
                </select>
                <button type="submit" className="registerbtn w30">
                Submit</button>
            </div>
        </form>
        </div>
    </div>
    )
  }
}


export default Currency;
