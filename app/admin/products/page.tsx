import PageHeader from '@/app/admin/_components/PageHeader';
import prisma from '@/app/db/db';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { CheckCircle2, Edit, MoreVertical, Trash, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './_components/ProductActions';

export default function Products() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

async function ProductTable() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } }
    },
    orderBy: { name: "asc" }
  });

  if (products.length === 0) return <p>No Product found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-0'>
            <span className='sr-only'>Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className='sr-only'>Available</span>
                  <CheckCircle2 className='text-green-600' />
                </>
              ) : (
                <>
                  <span className='sr-only'>Not Available</span>
                  <XCircle className='text-red-600' />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a download href={`/admin/product/${product.id}/download`}>Download</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
