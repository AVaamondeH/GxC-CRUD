import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User } from "@/context/types/User";
import axios from "axios"
import { endpoint } from "@/utils/endpoint";
import { useUserContext } from "@/context/UserContext";
import Swal from 'sweetalert2'



export type FormModalProps = {
	setShowModal: (show: boolean) => void
	isUpdate: boolean
	user: User | null
}

const FormModal = ({ setShowModal, user, isUpdate }: FormModalProps) => {
	const { setReload } = useUserContext()
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		if (isUpdate && user) {
			setFormData({
				name: user.name,
				username: user.username,
				email: user.email,
				phone: user.phone,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};


	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			if (isUpdate && user) {

				await axios.put(`${endpoint}/${user.id}`, formData)
				Swal.fire({
					title: "User created Successfully!",
					icon: 'success',
				}).then(() => setReload(true))

			} else {
				await axios.post(endpoint, formData)
				Swal.fire({
					title: "User updated Successfully!",
					icon: 'success',
				}).then(() => setReload(true))
			}
		} catch (error) {
			if (isUpdate) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong updating this user, please try again later',
				})

			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong creating, please try again later',
				})
			}

		}
		setShowModal(false);
	};

	return (
		<>
			<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none m-9">
						<div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t">
							<h3 className="text-3xl font-semibold">{isUpdate ? `Update a user` : `Create a new user`} </h3>
						</div>
						<div className="relative p-6 flex-auto">
							<form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full ">
								<Label>Name</Label>
								<Input
									className="text-center"
									type="text"
									name="name"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={handleInputChange}
								/>

								<Label>Username</Label>
								<Input
									className="text-center"
									type="text"
									name="username"
									placeholder="Enter a username"
									value={formData.username}
									onChange={handleInputChange}
								/>

								<Label>Email</Label>
								<Input
									className="text-center"
									type="email"
									name="email"
									id="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={handleInputChange}
								/>

								<Label>Phone</Label>
								<Input
									className="text-center"
									type="text"
									name="phone"
									placeholder="Enter your phone number"
									value={formData.phone}
									onChange={handleInputChange}
								/>
							</form>
						</div>
						<div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
							<Button variant="destructive" onClick={() => setShowModal(false)}>
								Cancel
							</Button>
							<Button onClick={handleSubmit}>Submit</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)

};

export default FormModal;
