import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './graphql/config'
import { BeerList } from './components/list'
import './App.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// library.add(faStar)

class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <div className="App">
                    <header className="App-header">Beers with Graphql</header>
                    <main className="App-body">
                        <BeerList />
                    </main>
                </div>
            </ApolloProvider>
        )
    }
}

export default App
