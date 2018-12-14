import React from 'react'
import { Mutation } from 'react-apollo'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './rating.styles.scss'
import { ADD_RATING, QRY_BEER, QRY_BEERS_LIST } from '../../graphql/schema'

const ratingComponent = props => {
    const { beerId, rating, modal } = props
    const query = modal ? { query: QRY_BEER, variables: { id: beerId } } : { query: QRY_BEERS_LIST }
    return (
        <Mutation mutation={ADD_RATING} refetchQueries={[query]}>
            {(addRating, { data }) => {
                const newRating = rating.average
                const newCount = rating.count
                return (
                    <div className="ratingsWrapper">
                        <Rating
                            onChange={rating => {
                                addRating({ variables: { parameters: { beerId, rating } } })
                            }}
                            start={0}
                            stop={5}
                            fractions={2}
                            placeholderSymbol={<FontAwesomeIcon icon="star" className="full" />}
                            emptySymbol={<FontAwesomeIcon icon="star" className="empty" />}
                            fullSymbol={<FontAwesomeIcon icon="star" className="full" />}
                            placeholderRating={Math.round(newRating * 2) / 2}
                        />
                        <div className="counter">({newCount})</div>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default ratingComponent
