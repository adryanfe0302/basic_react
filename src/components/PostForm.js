import React, { Component } from 'react';

class PostsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('submit')
    const post = {
        title: this.state.title,
        body: this.state.body
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(data => console.log(data))

  }
 
  render() {
    return (
      <div>
        <h1>Add Posts</h1>
        <form onSubmit={this.onSubmit}>
            <div>
                <label>title</label><br />
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
            </div>
            <br />
            <div>
                <label>body</label><br />
                <textarea name='body' value={this.state.body} onChange={this.onChange} />
            </div>
            <br />
            <button type='submit'>submit</button>
        </form>
      </div>
    );
  }
}

export default PostsForm;
