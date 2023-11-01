import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext";
import { ArrowUp, ArrowDown } from "lucide-react"

export type OrderButtonProps = {
	newOrder: string
}


const OrderButton = ({newOrder}:OrderButtonProps) => {
	const { order, changeOrder, currentOrder, changeCurrentOrder } = useUserContext();

	const onClick = () => {
		if (currentOrder !== newOrder) changeCurrentOrder(newOrder)
		changeOrder(order === "asc" ? "desc" : "asc")
	}
	return (
		<>
			<Button
				variant={newOrder === currentOrder ? "default" : "outline"}
				onClick={onClick}
			>
				{newOrder}
				{newOrder === currentOrder ?
				(order === "asc"  ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" /> )
				:""
				}
			</Button>
		</>
	);
};

export default OrderButton;
