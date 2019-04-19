import React, { Component } from 'react'

function Warning(props) {
    return (
        <div className="warning">*Please Fill the name</div>
    )
}

function Results(props) {
    if (props.data.length == 0) {
        return ''
    } else {
        return (
            <div className="list">
            <h2>Registered List</h2>
            <p> List Registered</p>
            <hr />
            <ul>
                <li>
                    <div> {props.data} </div>
                    <div> </div> -
                    <div> </div>/
                    <div> </div> - 
                    <div> </div> -
                    <div> </div>
                    <div className="fright">
                        &times;
                    </div>
                    <br />
                </li>
            </ul>
        </div>
        )
    }
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
      console.log('reset')
    //   this.setState(this.state.name = '')
  }

  onSubmit = e => {
      e.preventDefault();
      let post = {
          resname: this.state.name,
          resbirth: this.state.birth
      }
      this.state.lists.push(post)
      this.Reset()
      console.log('e', this.state)
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value})
    //   console.log('onchange', e.target)
      if (e.target.value == '') {
        this.state.warning = true
      } else {
        this.state.warning = false
      }
  }

  onChangeBirth = e => {
    this.setState({ [e.target.name]: e.target.value})
    // console.log('onchange', e.target)
}

  render() {
    let Warnings;
    if (this.state.warning) {
        Warnings = <Warning />
    }
    const looping = this.state.lists.map((list,index) => (
        <li key={index}>
            <div> {list.resname}</div>
            <div> {list.resbirth}</div> -
            <div> </div>/
            <div> </div> - 
            <div> </div> -
            <div> </div>
            <div className="fright">
                &times;
            </div>
            <br />
        </li>
    ));
    return (
      <div id='app'>
        {/* <div className="overlay">
            <div className="modal">
            <span className="close">&times;</span>   
            Preview Photo
            <div className="prevImg" align="center"> 
                <img id="output" />
            </div>
                <button type="button" className="rotateBtn">rotate</button>
                <button type="button" className="submitBtn">Submit</button>
            </div>
        </div> */}

        {/* form */}

        <div className="register">
        <form onSubmit={this.onSubmit}>
            <h2>Register</h2>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="name"><b>Full Name</b></label>
            <input value={this.state.name} type="text" placeholder="Enter Name" name="name" onChange={this.onChange} />
            {Warnings}
            {/* <div className="warning" v-show="warning">*Please Fill the name</div> */}
            <label htmlFor="birth"><b>Birth Place</b></label>
            <input value={this.state.birth} type="text" placeholder="Birth Place" name="birth" onChange={this.onChangeBirth} required />

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
                {/* <li>
                    <div>  </div>
                    <div> </div> -
                    <div> </div>/
                    <div> </div> - 
                    <div> </div> -
                    <div> </div>
                    <div className="fright">
                        &times;
                    </div>
                    <br />
                </li> */}
            </ul>
        </div>
        {/* <Results data={this.state.lists} /> */}
    </div>
    )
  }
}

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// }

export default Trial;
