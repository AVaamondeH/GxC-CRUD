import { User } from "@/context/types/User"
import { ColumnDef } from "@tanstack/react-table"
import { OrderButton } from "./OrderButton"
import UserActions from "./ActionDropdown/ActionDropdown"


export const columns: ColumnDef<User>[] = [

    {
        accessorKey: "id",
        header: () => {
            return (
                <OrderButton newOrder={"id"} />
            )
        },
    },
    {
        accessorKey: "name",
        header: () => {
            return (
                <OrderButton newOrder={"name"} />
            )
        },
    },
    {
        accessorKey: "username",
        header: () => {
            return (
                <OrderButton newOrder={"username"} />
            )
        },
    },
    {
        accessorKey: "email",
        header: () => {
            return (
                <OrderButton newOrder={"email"} />
            )
        },
    },
    {
        accessorKey: "phone",
        header: "phone"
    },

    {
        id: "actions",
        cell: ({ row }) => <UserActions user={row.original} /> ,
    },
]
