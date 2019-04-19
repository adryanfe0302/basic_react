import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.submit = this.submit.bind(this)
  }
  componentWillMount () {
    console.log('mounted')
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => this.setState({ posts: data}));
  }
  submit(e) {
    console.log('here')
  }
  render() {
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Hello New World</h1>
        <button type='submit' onClick={this.submit}>Post</button>
        {postItems}
      </div>
    );  
  }
}

export default Posts;
