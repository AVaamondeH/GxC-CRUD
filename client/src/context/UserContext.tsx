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
  changeFilter: (newFilter: {
    column: string;
    filterType: string;
    searchValue: string;
  }) => void
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [currentOrder, setCurrentOrder] = useState("id");
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({
                                          column: "",
                                          filterType: "",
                                          searchValue: "",
                                        });


  useEffect(() => {
    const fetchData = async (page: number) => {

      try {
        const { data } = await axios(`${endpoint}/paginated?page=${page}&pageSize=${pageSize}&sortBy=${currentOrder}&order=${order}&column=${filter.column}&filterType=${filter.filterType}&searchValue=${filter.searchValue}`);
        const { users, totalPages } = data;
        setUsers(users);
        setTotalPages(totalPages);
        setReload(false)
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData(currentPage);
  }, [currentPage, pageSize, order, currentOrder, reload, filter]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  const changeOrder = (newOrder: "asc" | "desc") => {
    setOrder(newOrder)
  }

  const changeCurrentOrder = (newCurrentOrder: string) => {
    setCurrentOrder(newCurrentOrder)
  }

  const changeFilter = (newFilter: {
    column: string;
    filterType: string;
    searchValue: string;
  }) => {
    setFilter(newFilter);
  }

  return (
    <UserContext.Provider value={{ users, currentPage, pageSize, totalPages, order, currentOrder, changePage, changePageSize, changeOrder, changeCurrentOrder, setReload, changeFilter }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be wrapped inside a UserProvider");
  }

  return context;
};

export { UserProvider, useUserContext };
