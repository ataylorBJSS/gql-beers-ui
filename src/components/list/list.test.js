import React from 'react'
import { render, cleanup, waitUntilLoadingIsFinished } from '../../libs/testUtils'
import { MockedProvider } from 'react-apollo/test-utils'
import { BeerList } from './index'
import { QRY_BEERS_LIST } from '../../graphql/schema'

const mocks = [
    {
        request: {
            query: QRY_BEERS_LIST,
        },
        result: {
            data: {
                beers: [
                    {
                        id: '1',
                        name: 'name',
                        abv: 4.2,
                        ebc: 10,
                        srm: 5.4,
                        tagline: 'tagline',
                        image_url: '_IMAGEURL_',
                        ratings: {
                            total: {
                                average: 4,
                                count: 3,
                            },
                        },
                    },
                ],
            },
        },
    },
]

afterEach(cleanup)

it('renders without crashing', () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BeerList />
        </MockedProvider>
    )
})

it('renders loading', () => {
    const { container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BeerList />
        </MockedProvider>
    )

    expect(container).toMatchSnapshot()
})

it('renders data', async () => {
    const { queryByText, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BeerList />
        </MockedProvider>
    )

    await waitUntilLoadingIsFinished(queryByText)

    expect(container).toMatchSnapshot()
})
