import React from 'react'
import { Mutation } from 'react-apollo'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './rating.styles.scss'
import { ADD_RATING } from '../../graphql/schema'

const ratingComponent = props => {
    const { beerId, rating } = props
    return (
        <Mutation mutation={ADD_RATING}>
            {(addRating, { data }) => {
                const newRating = data ? data.addRating.average : rating.average
                const newCount = data ? data.addRating.count : rating.count
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
