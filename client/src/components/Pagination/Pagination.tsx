import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext";

const Pagination = () => {
	const {currentPage, totalPages, changePage} = useUserContext()
	
	return (
		<>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={ ()=> changePage(currentPage - 1)}
					disabled={currentPage <= 1}

				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={ ()=> changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</Button>
			</div>
		</>
	);
};

export default Pagination;
