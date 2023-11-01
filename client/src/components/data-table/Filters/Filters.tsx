import { Button, Input } from "@/components";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/context/types/User";
import { useState } from "react";

type UserProperty = keyof User;

const Filters= () => {
	const { changePageSize } = useUserContext()
	const [filterValue, setfilterValue] = useState({
		column: "",
		filter: "",
		input: "",
	});
	const handleChangeColunm = (value: string) => {
		console.log(value);
		setfilterValue({
			...filterValue,
			column: value
		})
	}

	const handleChangeFilter = (value: string) => {
		setfilterValue({
			...filterValue,
			filter: value
		})
		console.log(value);
	}

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setfilterValue({
			...filterValue,
			input: value
		})
		console.log(value);
	}


	const userProperties: UserProperty[] = ['name', 'username', 'email', 'phone'];
	return (
		<>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Select
					onValueChange={(value) => handleChangeColunm(value)}
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Select a column" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{userProperties.map((property) => (
								<SelectItem key={property} value={property} >
									{property}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select >
				<Select
					onValueChange={(value) => handleChangeFilter(value)}
					disabled={filterValue.column ? false : true}
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Select a filter" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="Contains">Contains</SelectItem>
							<SelectItem value="Does Not Contain">Does Not Contain</SelectItem>
							<SelectItem value="Equals">Equals</SelectItem>
							<SelectItem value="Not Equal">Not Equal</SelectItem>
							<SelectItem value="Starts With">Starts With</SelectItem>
							<SelectItem value="Ends With">Ends With</SelectItem>
						</SelectGroup>
					</SelectContent>

				</Select>
				<Input
					placeholder="Filter by"
					disabled={filterValue.filter ? false : true}
					className="w-[200px] "
					onChange={handleChangeInput}
					/>
				<Button
					variant="outline"
					size="sm"
					disabled={filterValue.input ? false : true}
					onClick={() => setShowModal(!showModal)}
				>
					Filter
				</Button>
			</div>
		</>
	)
};

export default Filters;
