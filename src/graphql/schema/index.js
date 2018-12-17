import gql from 'graphql-tag'

// Example of how we can use fragments
// Removed for now, as there are issue with mocking queries with fragments
// const beerDetails = gql`
//     fragment BeerDetails on Beer {
//         id
//         name
//         tagline
//         image_url
//         abv
//         srm
//         ebc
//     }
// `

export const QRY_BEERS_LIST = gql`
    {
        beers {
            id
            name
            tagline
            image_url
            abv
            srm
            ebc
            ratings {
                total {
                    average
                    count
                }
            }
        }
    }
`

export const QRY_BEER = gql`
    query Beer($id: Int!) {
        beer(id: $id) {
            id
            name
            tagline
            image_url
            abv
            srm
            ebc
            description
            first_brewed
            food_pairing
            ratings {
                total {
                    average
                    count
                }
                rating {
                    rating
                    comment
                }
            }
        }
    }
`

export const ADD_RATING = gql`
    mutation AddRating($parameters: RatingParameters) {
        addRating(parameters: $parameters)
    }
`
