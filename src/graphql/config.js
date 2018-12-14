import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    request: async operation => {
        const token = 'TEST TOKEN'
        operation.setContext({
            headers: {
                authorization: token,
            },
        })
    },
})

export default client
