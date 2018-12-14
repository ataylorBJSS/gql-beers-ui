import React from 'react'
import { Provider } from 'unstated'
import ListItem from './item'
import { MockedProvider } from 'react-apollo/test-utils'
import { render, cleanup } from '../../libs/testUtils'

const mock = {
    data: {
        id: '1',
        name: '__NAME__',
        abv: 10,
        ebc: 5.0,
        tagline: '__TAGLINE__',
        image_url: '__IMGURL',
        ratings: {
            total: {
                average: 4,
                count: 3,
            },
        },
    },
}

afterEach(cleanup)

it('renders without crashing', () => {
    render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Provider>
                <ListItem data={mock.data} />
            </Provider>
        </MockedProvider>
    )
})

it('renders data', () => {
    const { container } = render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Provider>
                <ListItem data={mock.data} />
            </Provider>
        </MockedProvider>
    )

    expect(container).toMatchSnapshot()
})
