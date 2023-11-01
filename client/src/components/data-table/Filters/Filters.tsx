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

const Filters = () => {
	const { changeFilter } = useUserContext()
	const [filterValue, setfilterValue] = useState({
		column: "",
		filterType: "",
		searchValue: "",
	});
	const handleChangeColunm = (value: string) => {
		setfilterValue({
			...filterValue,
			column: value
		})
	}

	const handleChangeFilter = (value: string) => {
		setfilterValue({
			...filterValue,
			filterType: value
		})
	}

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setfilterValue({
			...filterValue,
			searchValue: value
		})
	}

	const onClick = () => {
		if (!filterValue.column || !filterValue.filterType || !filterValue.searchValue) {
			console.error("Falta información en el filtro. Por favor, complete todos los campos.");
		} else {
			changeFilter(filterValue);
		}
	}


	const userProperties: UserProperty[] = ['name', 'username', 'email', 'phone'];
	return (
		<>
			<div className="flex items-center justify-end space-x-2 py-4 ">
				<Select
					onValueChange={(value) => handleChangeColunm(value)}
					name="column"
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
					name="filter"
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Select a filter" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem id="Contains" value="Contains">Contains</SelectItem>
							<SelectItem value="NotContains">Not Contains</SelectItem>
							<SelectItem value="Equals">Equals</SelectItem>
							<SelectItem value="NotEquals">Not Equal</SelectItem>
							<SelectItem value="StartsWith">Starts With</SelectItem>
							<SelectItem value="EndsWith">Ends With</SelectItem>
						</SelectGroup>
					</SelectContent>

				</Select>
				<Input
					placeholder="Filter by"
					disabled={filterValue.filterType ? false : true}
					className="w-[200px] "
					onChange={handleChangeInput}
				/>
				<Button
					variant="outline"
					size="sm"
					disabled={filterValue.searchValue ? false : true}
					onClick={onClick}
				>
					Filter
				</Button>
			</div>
		</>
	)
};

export default Filters;
