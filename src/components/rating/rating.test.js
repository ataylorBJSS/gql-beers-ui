import React from 'react'
import Rating from './rating'
import { MockedProvider } from 'react-apollo/test-utils'
import { render, getByText, cleanup } from '../../libs/testUtils'

const mock = {
    data: {
        beerId: '1',
        rating: {
            average: 4,
            count: 3,
        },
    },
}

afterEach(cleanup)

it('renders without crashing', () => {
    render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Rating beerId={mock.data.beerId} rating={mock.data.rating} />
        </MockedProvider>
    )
})

it('renders with data', () => {
    const { container } = render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Rating beerId={mock.data.beerId} rating={mock.data.rating} />
        </MockedProvider>
    )

    expect(container).toMatchSnapshot()
})

it('renders counter correctly', () => {
    const { container } = render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Rating beerId={mock.data.beerId} rating={mock.data.rating} />
        </MockedProvider>
    )

    expect(getByText(container, `(${mock.data.rating.count})`)).toBeTruthy()

    expect(container).toMatchSnapshot()
})
