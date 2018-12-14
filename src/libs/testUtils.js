import { wait } from 'react-testing-library'

export * from 'react-testing-library'

const waitUntilLoadingIsFinished = queryByText =>
    wait(() => {
        const isLoading = queryByText('Loading') != null
        expect(isLoading).toBe(false)
    })

export { waitUntilLoadingIsFinished }
