import gql from 'graphql-tag'

export const QRY_BEERS_LIST = gql`
    {
        beers {
            id
            name
            tagline
            image_url
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
            abv
            image_url
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
        addRating(parameters: $parameters) {
            average
            count
        }
    }
`
