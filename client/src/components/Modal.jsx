const Modal = (props) => {
    const { index, id, handleDeleteSubmit } = props
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Confirm delete
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button id={'delete-' + index} onClick={handleDeleteSubmit} className="dropdown-item btn btn-primary" data-id={id}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal