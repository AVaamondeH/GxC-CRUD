import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext";
import { ArrowUpDown } from "lucide-react"

export type OrderButtonProps = {
	newOrder: string
}


const OrderButton = ({newOrder}:OrderButtonProps) => {
	const { order, changeOrder, currentOrder, changeCurrentOrder } = useUserContext();

	const onClick = () => {
		console.log(order, newOrder);
		
		if (currentOrder !== newOrder) changeCurrentOrder(newOrder)
		changeOrder(order === "asc" ? "desc" : "asc")
	}
	return (
		<>
			<Button
				variant="ghost"
				onClick={onClick}
			>
				{newOrder}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		</>
	);
};

export default OrderButton;
