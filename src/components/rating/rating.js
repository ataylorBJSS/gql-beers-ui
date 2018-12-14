import React from 'react'
import { Mutation } from 'react-apollo'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { ADD_RATING, QRY_BEER, QRY_BEERS_LIST } from '../../graphql/schema'
import './rating.styles.scss'

const ratingComponent = props => {
    const { beerId, rating, modal } = props
    const query = modal ? { query: QRY_BEER, variables: { id: beerId } } : { query: QRY_BEERS_LIST }
    return (
        <Mutation mutation={ADD_RATING} refetchQueries={[query]}>
            {addRating => {
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
                            placeholderSymbol={<FontAwesomeIcon icon={faStar} className="full" />}
                            emptySymbol={<FontAwesomeIcon icon={faStar} className="empty" />}
                            fullSymbol={<FontAwesomeIcon icon={faStar} className="full" />}
                            placeholderRating={Math.round(newRating * 2) / 2}
                        />
                        <div data-testid="ratings-counter" className="counter">
                            ({newCount})
                        </div>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default ratingComponent
