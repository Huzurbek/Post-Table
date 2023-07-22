import { useEffect } from "react";
import { CustomTable } from "./components/custom-table";
import { POSTS_TABLE_HEADS } from "./constants";
import { usePost } from "./hooks/usePosts";
import { SearchInput } from "./components/search-input";
import { SearchIcon } from "./components/icons";
import Pagination from "./components/Pagination";

function App() {
  const { postsData, loading, setFilter, setPagination, pagination, setSort } =
    usePost({
      autoLoad: true,
    });

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    if (pageNumber != null)
      setPagination({ page: Number(pageNumber), perPage: 10 });
  }, [setPagination]);

  return (
    <div className="container">
      <SearchInput
        disabled={loading}
        endIcon={<SearchIcon />}
        placeholder="Поиск"
        style={{ maxWidth: 600, marginTop: 24, marginBottom: 16 }}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter(e.target.value)
        }
      />
      <CustomTable
        loading={loading}
        onSort={setSort}
        rows={postsData}
        heads={POSTS_TABLE_HEADS}
      />
      {!loading && (
        <Pagination
          onChangePage={(page) => {
            setPagination({ ...pagination, page });
            history.replaceState({}, "", `?page=${page}`);
          }}
          page={pagination.page}
          perPage={10}
          total={95}
          style={{ padding: "0 45px" }}
        />
      )}
    </div>
  );
}

export default App;
