import React from 'react'

function Addedmodal() {
    return (
        <div>
            <div className="modal-container">
                <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                    <h3>You added a movie to your list!</h3>
                    </div>
                    <button className="modal-close is-large" aria-label="close"></button>
                </div>
            </div>
        </div>
    )
}

export default Addedmodal
