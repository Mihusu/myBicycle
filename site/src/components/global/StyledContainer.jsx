import React from 'react'

const StyledContainer = (props) => {
    return (
        <section className="bg-white shadow-sm py-8 mb-4 rounded-md">
            <div className="container px-8 mx-auto">
                {props.children}
            </div>
        </section>
    )
}

export default StyledContainer