import React, { Component } from 'react'

function Warning(props) {
    return (
        <div className="warning">*Please Fill the name</div>
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
            <Delete key={index} index={index} list={list} onRemove={this.props.deleteList}></Delete>
           )
        });
        return (
            <ul> {loopings} </ul>
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
            <li>
                <div> {this.props.index + 1}.</div>
                <div> {this.props.list.resname} </div> -
                <div> {this.props.list.resbirth} </div> -
                <div> {this.props.list.resstatus} </div> 
                <div className="fright cursor" onClick={this.onRemove}>
                    &times;
                </div>
                <br /><br />
            </li>
        )
    }
}

class Trial extends Component {
  constructor(props) {
      super(props);
      this.state = {
        targetUrl: '',
        lists: [
            {resname: 'one',resbirth: '12',resstatus: 'Single'},
            {resname: 'two',resbirth: '23',resstatus: 'Married'},
            {resname: 'four',resbirth: '03',resstatus: 'Single'}
        ],
        show: false,
        name: '',
        birth: '',
        id: '',
        date: '',
        address: '',
        filePhoto: '',
        status: '',
        warning: false,
        position: ''
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
        resname: this.state.name,
        resbirth: this.state.birth,
        resstatus: this.state.status
    }
    this.state.lists.push(post)
    this.Reset()
    // if(this.state.lists.length === 0) {
    //     this.state.lists.push(post)
    //     this.Reset()
    // } else {
    //     this.state.lists.forEach(x => {
    //         if (x.resname !== this.state.name) {
    //             console.log('here')
    //             this.state.lists.push(post)
    //             this.Reset()
    //         } else{
    //             console.log('out')
    //             this.Reset()
    //         }
    //     })
    // }
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
    }
    componentDidMount () {
        console.log('moun2')
    }

  render() {
    let Warnings;
    if (this.state.warning) {
        Warnings = <Warning />
    }
    // let looping = this.state.lists.map((list,index) => (
    //     <li key={index}>
    //         <div> {index + 1}.</div>
    //         <div> {list.resname} </div> -
    //         <div> {list.resbirth} </div>/
    //         <div> {list.resstatus} </div> - 
    //         <div className="fright cursor" onSubmit={this.deleteList(list)}>
    //             &times;
    //         </div>
    //         <br /><br />
    //     </li>
    // ));
    return (
      <div id='app'>
        <div className="register">
        <form onSubmit={this.onSubmit}>
            <h2>Register</h2>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="name"><b>Full Name</b></label>
            <input value={this.state.name} type="text" placeholder="Enter Name" name="name" onChange={this.onChange} />
            {Warnings}
            <label htmlFor="birth"><b>Birth Place</b></label>
            <input value={this.state.birth} type="text" placeholder="Birth Place" name="birth" onChange={this.onChangeBirth} required />
            <label htmlFor="marital"><b>Marital Status</b></label>
            <select value={this.state.status} onChange={this.fillStatus} name='status'>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorce">Divorce</option>
                <option value="Widowed">Widowed</option>
            </select>
            <button type="submit" className="registerbtn" >Register</button>
        </form>
        </div>
        <div className="list">
            <h2>Registered List</h2>
            <p> List Registered</p>
            <hr />
            {/* {loopings} */}
            <Looping todoItems={this.state.lists} deleteList={this.deleteList}></Looping>
        </div>
        
    </div>
    )
  }
}


export default Trial;
