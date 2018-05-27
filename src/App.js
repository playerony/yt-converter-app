import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import configureStore from './configureStore'
import DownloadVideoPage from './containers/DownloadVideoPage'
import Navbar from './components/Navbar'
import './styles/App.css'
import './styles/Button.css'
import './styles/Container.css'
import './styles/Input.css'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={DownloadVideoPage} />
          </Switch>
        </div>
      </Provider>
    )
  }
}
export default App
