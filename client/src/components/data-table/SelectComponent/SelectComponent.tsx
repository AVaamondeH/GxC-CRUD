import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/UserContext";


const SelectComponent = () => {
	const { changePageSize } = useUserContext()

	const handleChange = (value: string) => {
		const number = parseInt(value);
		changePageSize(number);
	}

	return (
		<>
			<div className="flex items-center justify-end space-x-2 py-4">
				<span>Show </span>
				<Select onValueChange={(value) => handleChange(value)}>
					<SelectTrigger className="w-[60px]">
						<SelectValue placeholder="5" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="5">5</SelectItem>
							<SelectItem value="10">10</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<span> results per page</span>
			</div>
		</>
	)
};

export default SelectComponent;
