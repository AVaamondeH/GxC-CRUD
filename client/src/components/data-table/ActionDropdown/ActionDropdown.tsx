import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/context/types/User";
import { FormModal } from "@/components";
import { useState } from "react";
import axios from "axios"
import { endpoint } from "@/utils/endpoint";
import { useUserContext } from "@/context/UserContext";
import Swal from 'sweetalert2'

interface UserActionsProps {
	user: User;
}

const UserActions = ({ user }: UserActionsProps) => {
	const [showModal, setShowModal] = useState(false);
	const { setReload } = useUserContext()


	const handleDelete = async (id: number) => {
		try {
			Swal.fire({
				title: "You're sure?",
				text: 'This action will erase tis user',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, continue',
				cancelButtonText: 'Cancel'
			}).then(async (result) => {
				if (result.isConfirmed) {
					await axios.delete(`${endpoint}/${id}`)
					setReload(true)
					Swal.fire('OK!', 'User deleted successfully', 'success');
				}
			});
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong deleting this user, please try again later',
			})
		}
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setShowModal(true)}>Edit</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{showModal && (
				<div className="fixed inset-0 z-50 bg-opacity-50 bg-gray-600 backdrop-blur">
					<FormModal setShowModal={setShowModal} isUpdate={true} user={user} />
				</div>
			)}
		</>
	);
};

export default UserActions