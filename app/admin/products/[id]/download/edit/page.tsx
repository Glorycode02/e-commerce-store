import React from 'react'
import PageHeader from '../../../../_components/PageHeader'
import ProductForm from '../../../_components/ProductForm'
import prisma from '@/app/db/db'

export default async function EditProduct({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({ where: { id } })
    return (
        <>
            <PageHeader> EditProduct</PageHeader>
            <ProductForm product={product} />
        </>
    )
}


