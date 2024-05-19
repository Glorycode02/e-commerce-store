"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProAvail } from "../../_actions/products"
import { useRouter } from "next/navigation"
import router from "next/router"

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProAvail(id, !isAvailableForPurchase)
                    router.refresh()
                })
            }}
            className={isAvailableForPurchase ? "bg-red-600" : "bg-green-600"}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id)
                    router.refresh()
                })
            }}
            className="text-red-600"
        >
            Delete
        </DropdownMenuItem>
    )
}