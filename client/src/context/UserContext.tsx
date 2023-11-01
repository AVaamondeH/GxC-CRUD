import { User } from "@/context/types/User";
import { endpoint } from "@/utils/endpoint";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";


type UserProviderType = {
  children: React.ReactNode;
}

type UserContextType = {
  users: User[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  order: "asc" | "desc";
  currentOrder: string;
  changePage: (newPage: number) => void;
  changePageSize: (newPageSize: number) => void;
  changeOrder: (newOrder: "asc" | "desc") => void;
  changeCurrentOrder: (newCurrentOrder: string) => void;
  setReload: (reload: boolean) => void
};



const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [currentOrder, setCurrentOrder] = useState("name");
  const [reload, setReload] = useState(false);
  

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        console.log(`${endpoint}/paginated?page=${page}&pageSize=${pageSize}&sortBy=${currentOrder}&order=${order}`);
        
        const { data } = await axios.get(
          `${endpoint}/paginated?page=${page}&pageSize=${pageSize}&sortBy=${currentOrder}&order=${order}`
        );
        const { users, totalPages } = data;
        console.log(data);
        
        setUsers(users);
        setTotalPages(totalPages);
        setReload(false)
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData(currentPage);
  }, [currentPage, pageSize, order,currentOrder, reload]);

  const changePage = (newPage: number) => {
            console.log("changePage");
    setCurrentPage(newPage);
  };

  const changePageSize = (newPageSize: number) => {
            console.log("changePageSize");
    setPageSize(newPageSize)
  }

  const changeOrder = (newOrder: "asc" | "desc") => {
            console.log(order, currentOrder);
    setOrder(newOrder)
  }

  const changeCurrentOrder = (newCurrentOrder: string) => {
            console.log("changeCurrentOrder");
    setCurrentOrder(newCurrentOrder)
  }


  return (
    <UserContext.Provider value={{ users, currentPage, pageSize, totalPages, order,currentOrder, changePage, changePageSize, changeOrder, changeCurrentOrder, setReload }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }

  return context;
};

export { UserProvider, useUserContext };
