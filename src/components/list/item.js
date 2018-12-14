import React from 'react'
import './list.styles.scss'
import { Ratings } from '../rating'
import { Subscribe } from 'unstated'
import ModalContainer from '../modal/modal.state'
import { QRY_BEER } from '../../graphql/schema'

const item = props => {
    const { id, name, abv, ebc, tagline, image_url, ratings } = props.data
    return (
        <div className="listItem">
            <div>
                <img src={image_url} alt={name} />
            </div>
            <div>{name}</div>
            <div>{tagline}</div>
            {/* Need to figure out if this is the correct way of getting beer colour, ebc or ebc? */}
            <div className={`abv beer-color-${ebc > 40 ? 40 : Math.ceil(ebc)}`}>{abv}%</div>
            <Ratings beerId={id} rating={ratings.total} />
            <Subscribe to={[ModalContainer]}>
                {modal => <button onClick={() => modal.openModal(id, QRY_BEER)}>View Details</button>}
            </Subscribe>
        </div>
    )
}

export default item
