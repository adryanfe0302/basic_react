import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import Posts from './components/Posts';
// import PostsForm from './components/PostForm';
import Trial from './components/Trial';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Trial></Trial>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <PostsForm />
          <hr />
          <Posts />
        </header> */}
      </div>
    );
  }
}

export default App;
