import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetUsers, searchUsersRequest} from "@src/search/slices/searchSlice.ts";
import {SearchRequest} from "@src/search/models/search.ts";
import debounce from "lodash.debounce";
import {Button, Stack, TextField} from "@mui/material";
import {RootState} from "@src/_redux/store.ts";
import {per_page} from "@src/search/constants.ts";



export default function SearchForm() {
    const [query, setQuery] = useState("");
    const { total_count } = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const handleSearch =  useCallback(
        debounce((value: string, page: number) => {
            if (value && value.length > 2) {
                const requestPayload: SearchRequest = { q: value, page };
                dispatch(searchUsersRequest(requestPayload));
            }
        }, 1000),
        [dispatch]
    );

    function nextPage() {
        const newPage = page + 1;
        setPage(newPage);
        handleSearch(query, newPage);
    }

    function prevPage() {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            handleSearch(query, newPage);
        }
    }

    function searchChange(e: React.ChangeEvent<HTMLInputElement>) {

        const valueFormat: string = e.target.value.trim();
        if(!valueFormat || valueFormat.length < 3) {
            dispatch(resetUsers());
        }
        setQuery(valueFormat);
        setPage(1)
        handleSearch(valueFormat, page);
    }

    return (
        <div className="search">
            <Stack direction="row" spacing={4} alignItems="center">
                <TextField id="standard-basic" label="Введите имя пользователя" variant="standard"
                           value={query}
                           onChange={searchChange}
                           placeholder="..."
                />
                {total_count > per_page && <Button disabled={page === 1} variant="contained" onClick={prevPage}>Предыдущая страница</Button>}
                {total_count > per_page && <><Button disabled={page >= Math.ceil(total_count / per_page)} variant="contained" onClick={nextPage}>Следующая страница</Button>
                    <div>Всего найдено: {total_count} | Cтраница: {page}</div>
                </>}

            </Stack>
        </div>
    );
}
