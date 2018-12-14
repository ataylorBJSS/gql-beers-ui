import React from 'react'
import Modal from 'react-awesome-modal'
import modalContainer from './modal.state'
import { Subscribe } from 'unstated'
import { Query } from 'react-apollo'
import { QRY_BEER } from '../../graphql/schema'
import './modal.styles.scss'
import { Ratings } from '../rating'

const modal = () => {
    return (
        <Subscribe to={[modalContainer]}>
            {modal => (
                <Modal visible={modal.state.show} width="50%" effect="fadeInUp" onClickAway={() => modal.closeModal()}>
                    <Query query={QRY_BEER} variables={{ id: modal.state.id }}>
                        {({ loading, error, data }) => {
                            console.log('refetching beer query')
                            if (loading) return <p>Getting some beer details.....</p>
                            if (error) return <p>Boom!</p>
                            return (
                                <div className="modalContainer">
                                    <div className="modalHeader">
                                        <img src={data.beer.image_url} alt={data.beer.name} width={80} height={250} />
                                        <div className="headerDetails">
                                            <div>
                                                {data.beer.name} (abv{data.beer.abv})
                                            </div>
                                            <div>{data.beer.tagline}</div>

                                            <Ratings
                                                modal={true}
                                                beerId={modal.state.id}
                                                rating={data.beer.ratings.total}
                                            />
                                        </div>
                                    </div>
                                    <div>{data.beer.description}</div>
                                    {!modal.state.showMore && <button onClick={() => modal.showMore()}>More...</button>}
                                    {modal.state.showMore && (
                                        <div className="moreDetails">
                                            <div>First Brewing: {data.beer.first_brewed}</div>
                                            {data.beer.food_pairing && (
                                                <div>
                                                    Drink with:
                                                    <ul>
                                                        {data.beer.food_pairing.map(pairing => (
                                                            <li>{pairing}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    </Query>
                </Modal>
            )}
        </Subscribe>
    )
}

export default modal
