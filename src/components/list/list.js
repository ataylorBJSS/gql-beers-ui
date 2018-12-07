import React from 'react'
import { Query } from 'react-apollo'
import { QRY_BEERS_LIST } from '../../graphql/schema'
import ListItem from './item'
import './list.styles.scss'
import { Modal } from '../modal'
import { Provider, Subscribe } from 'unstated'
import ModalContainer from '../modal/modal.state'

const list = props => {
    return (
        <Query query={QRY_BEERS_LIST}>
            {({ loading, error, data }) => {
                if (loading) return <p>Getting some beers.....</p>
                if (error) return <p>Beers gone everywhere!</p>

                return (
                    <Provider>
                        <div className="listContainer">
                            {data.beers.map(beer => (
                                <ListItem key={`item_${beer.id}`} data={beer} />
                            ))}
                        </div>
                        <Subscribe to={[ModalContainer]}>
                            {modal => {
                                return <React.Fragment>{modal.state.show && <Modal />}</React.Fragment>
                            }}
                        </Subscribe>
                    </Provider>
                )
            }}
        </Query>
    )
}

export default list
