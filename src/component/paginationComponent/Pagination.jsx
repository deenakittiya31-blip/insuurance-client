import React from 'react'

const Pagination = ({ onPrevious, onNext, disablePrev, disableNext }) => {
    return (
        <div className="join grid grid-cols-2">
            <button disabled={disablePrev} onClick={onPrevious} className="join-item btn btn-sm btn-outline btn-neutral">Previous page</button>
            <button disabled={disableNext} onClick={onNext} className="join-item btn btn-sm btn-outline btn-neutral">Next</button>
        </div>
    )
}

export default Pagination