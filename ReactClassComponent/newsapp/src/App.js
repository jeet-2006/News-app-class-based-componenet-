import React, { Component } from 'react'
import Navbar from './Componants/Navbar';
import News from './Componants/News';
import LoadingBar from 'react-top-loading-bar'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' country='in' pageSize={this.pageSize} category='general' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' country='in' pageSize={this.pageSize} category='business' />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' country='in' pageSize={this.pageSize} category='entertainment' />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' country='in' pageSize={this.pageSize} category='general' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' country='in' pageSize={this.pageSize} category='health' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' country='in' pageSize={this.pageSize} category='science' />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' country='in' pageSize={this.pageSize} category='sports' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' country='in' pageSize={this.pageSize} category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

