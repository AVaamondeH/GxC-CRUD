import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext";

const Pagination = () => {
	const { currentPage, totalPages, changePage } = useUserContext()

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers.map((pageNumber) => (
			<Button
				key={pageNumber}
				variant="outline"
				size="sm"
				onClick={() => changePage(pageNumber)}
				disabled={currentPage === pageNumber}
			>
				{pageNumber}
			</Button>
		));
	};

	return (
		<>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => changePage(currentPage - 1)}
					disabled={currentPage <= 1}

				>
					Previous
				</Button>
				{renderPageNumbers()}
				<Button
					variant="outline"
					size="sm"
					onClick={() => changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</Button>
			</div>
		</>
	);
};

export default Pagination;
