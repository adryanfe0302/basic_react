import React, { Component } from 'react'

function Warning(props) {
    return (
        <div className="warning">*Please Fill the name</div>
    )
}


// export class Warning extends Component {
//     render () {
//         return (
//             <div className="warning">*Please Fill the name</div>
//         )
//     }
// }

export class Trial extends Component {
  constructor(props) {
      super(props);
      this.state = {
        targetUrl: '',
        lists: [],
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
    //   this.submit = this.submit.bind(this)
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
    if(this.state.lists.length == 0) {
        this.state.lists.push(post)
        this.Reset()
    } else {
        this.state.lists.forEach(x => {
            if (x.resname != this.state.name) {
                console.log('here')
                this.state.lists.push(post)
                this.Reset()
            } else{
                console.log('out')
                this.Reset()
            }
        })
    }
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
     console.log('e', e)
 }

  render() {
    let Warnings;
    if (this.state.warning) {
        Warnings = <Warning />
    }
    const looping = this.state.lists.map((list,index) => (
        <li key={index}>
            <div> {index + 1}.</div>
            <div> {list.resname} </div> -
            <div> {list.resbirth} </div>/
            <div> {list.resstatus} </div> - 
            <div> </div> -
            <div> </div>
            <div className="fright" onClick={this.deleteList}>
                &times;
            </div>
            <br />
        </li>
    ));
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

            {/* <label htmlFor="date"><b>Birth Date</b></label>
            <br />
            <input v-model="date" type="date" placeholder="Birth Date" name="date" required />
            <br />
            <label htmlFor="address"><b>Address</b></label>
            <input v-model="address" type="text" placeholder="Address" name="address" required />
            <label htmlFor="photo"><b>Upload Photo</b></label>
            <input type="file" />
            <br />
            <label htmlFor="marital"><b>Marital Status</b></label>
            <select v-model="status">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorce">Divorce</option>
                <option value="Widowed">Widowed</option>
            </select> */}
            <button type="submit" className="registerbtn" >Register</button>
        </form>
        </div>
        <div className="list">
            <h2>Registered List</h2>
            <p> List Registered</p>
            <hr />
            <ul>
                {looping}
            </ul>
        </div>
        
    </div>
    )
  }
}

export default Trial;
