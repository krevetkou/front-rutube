import React from 'react'
import { Modal } from 'react-overlays'

import { Cross } from '../../icons'

import './Modal.css'

const renderBackdrop = (props) => <div {...props} className="backdrop" />

export const Dialog = ({ isOpen, onClose, title, buttons, children }) => {
    if (!isOpen) return null

    return (
        <Modal
            show={isOpen}
            onBackdropClick={onClose}
            renderBackdrop={renderBackdrop}
            className="modal"
        >
            <>
                <div className="modal_header">
                    <h3 className="modal_title">{title}</h3>
                    <Cross onClick={onClose} className="icon cross" />
                </div>
                <div className="modal_body">{children}</div>
                <div className="modal_footer">{buttons}</div>
            </>
        </Modal>
    )
}
