import React from 'react'
import { Provider } from 'unstated'
import Modal from './modal'
import modalContainer from './modal.state'
import { MockedProvider } from 'react-apollo/test-utils'
import { render, cleanup, fireEvent, waitUntilLoadingIsFinished, waitForErrorMessage } from '../../libs/testUtils'
import { QRY_BEER } from '../../graphql/schema'
import ModalContainer from './modal.state'

const mocks = [
    {
        request: {
            query: QRY_BEER,
            variables: {
                id: '1',
            },
        },
        result: {
            data: {
                beer: {
                    id: '1',
                    name: '__name__',
                    tagline: '__tagline__',
                    image_url: '__IMGURL__',
                    abv: 10,
                    srm: 5,
                    ebc: 5,
                    description: '__DESCRIPTION__',
                    first_brewed: '07/2015',
                    food_pairing: ['__FOOD1__', '__FOOD2__', '__FOOD3__'],
                    ratings: {
                        total: {
                            average: 5,
                            count: 4,
                        },
                        rating: [
                            {
                                rating: 5,
                                comment: 'Nice',
                            },
                        ],
                    },
                },
            },
        },
    },
]

afterEach(cleanup)

it('renders without crashing', () => {
    const modalContainer = new ModalContainer()
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider inject={[modalContainer]}>
                <Modal />
            </Provider>
        </MockedProvider>
    )
})

it('renders loading', () => {
    const modalContainer = new ModalContainer()
    const { container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider inject={[modalContainer]}>
                <Modal />
            </Provider>
        </MockedProvider>
    )

    expect(container).toMatchSnapshot()
})

it('renders errors', async () => {
    const modalContainer = new ModalContainer()
    const [data] = mocks
    const mock = { ...data, error: new Error('Error') }
    const { queryByText, container } = render(
        <MockedProvider mocks={[mock]} addTypename={false}>
            <Provider inject={[modalContainer]}>
                <Modal />
            </Provider>
        </MockedProvider>
    )

    await waitForErrorMessage(queryByText, 'Boom!')

    expect(container).toMatchSnapshot()
})

it('renders data', async () => {
    const modalContainer = new ModalContainer()
    modalContainer.openModal('1')
    const { queryByText, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider inject={[modalContainer]}>
                <Modal />
            </Provider>
        </MockedProvider>
    )

    await waitUntilLoadingIsFinished(queryByText, 'Getting some beer details.....')

    expect(container).toMatchSnapshot()
})

it('shows more details', async () => {
    const modalContainer = new ModalContainer()
    modalContainer.openModal('1')
    const { getByText, queryByText, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Provider inject={[modalContainer]}>
                <Modal />
            </Provider>
        </MockedProvider>
    )

    await waitUntilLoadingIsFinished(queryByText, 'Getting some beer details.....')

    fireEvent.click(getByText('More...'))

    expect(container).toMatchSnapshot()
})
