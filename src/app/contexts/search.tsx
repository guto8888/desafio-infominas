'use client'

import React, { ReactNode, createContext, useState } from "react";
import { ThemeTypes } from "../types/types";

export const searchs = {
    search: "",
    setSearch: () => {}
}

export const Search = createContext<ThemeTypes>(searchs)

export const SearchProvider = ({children}: {children: ReactNode}) => {
    const [search, setSearch] = useState(searchs.search)

    return (
        <Search.Provider value={{ search, setSearch }}>
            {children}
        </Search.Provider>
    )
}