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

    closeModal() {
        this.setState({ show: false, id: null, showMore: false })
    }

    showMore() {
        this.setState({ showMore: true })
    }
}

export default ModalContainer
