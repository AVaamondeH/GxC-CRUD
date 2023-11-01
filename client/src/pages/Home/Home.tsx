import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useUserContext } from "@/context/UserContext";


function Home() {

	const {users} = useUserContext()
	
	return (
	<>
		<div className="container mx-auto py-10">
		<DataTable columns={columns} data={users} />
		</div>
	</>
	)
}

export default Home;

