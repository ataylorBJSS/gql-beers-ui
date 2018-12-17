import { wait } from 'react-testing-library'

export * from 'react-testing-library'

const waitUntilLoadingIsFinished = (queryByText, loadingText) =>
    wait(() => {
        const isLoading = queryByText(loadingText) != null
        expect(isLoading).toBe(false)
    })

const waitForErrorMessage = (queryByText, ErrText) =>
    wait(() => {
        const hasError = queryByText(ErrText) != null
        expect(hasError).toBe(true)
    })

export { waitUntilLoadingIsFinished, waitForErrorMessage }
