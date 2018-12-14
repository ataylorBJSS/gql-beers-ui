import { Container } from 'unstated'

class ModalContainer extends Container {
    state = {
        show: false,
        id: null,
        showMore: false,
    }

    openModal(id) {
        this.setState({ show: true, id })
    }

    closeModal(...args) {
        console.log('why u close', args)
        this.setState({ show: false, id: null, showMore: false })
    }

    showMore() {
        this.setState({ showMore: true })
    }
}

export default ModalContainer
