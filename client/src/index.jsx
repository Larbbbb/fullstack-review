import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (repoList) => {
        this.setState({repos: repoList});
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {username: term},
      success: (response) => {
        console.log(response);
        this.getInfo();
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));