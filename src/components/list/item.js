import React from 'react'
import './list.styles.scss'
import { Ratings } from '../rating'
import { Subscribe } from 'unstated'
import ModalContainer from '../modal/modal.state'
import { QRY_BEER } from '../../graphql/schema'

const item = props => {
    const { id, name, tagline, image_url, ratings } = props.data
    return (
        <div className="listItem">
            <img src={image_url} alt={name} width={75} height={250} />
            <div>{name}</div>
            <div>{tagline}</div>
            <Ratings beerId={id} rating={ratings.total} />
            <Subscribe to={[ModalContainer]}>
                {modal => <button onClick={() => modal.openModal(id, QRY_BEER)}>View Details</button>}
            </Subscribe>
        </div>
    )
}

export default item
