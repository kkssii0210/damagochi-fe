import React, { createContext, useState } from 'react';

export const MapListContext = createContext({
    mapList: [],
});
export const MapListProvider = ({ children }) => {
    const [mapList, setMapList] = useState([]);

    return (
        <MapListContext.Provider value={{ mapList, setMapList }}>
            {children}
        </MapListContext.Provider>
    );
};