import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BeerList } from './components/list'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar)

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
})

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
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
