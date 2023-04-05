import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { ClaimBikeForm } from '../components/MyBikes/ClaimBikeForm'

export const ClaimBikePage = () => {
    return (
        <Layout title='Indløs cykel'>
            <ClaimBikeForm />
        </Layout>
    )
}
