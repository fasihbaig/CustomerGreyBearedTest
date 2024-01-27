import React, { ReactNode, useContext, useReducer } from "react";
import { DrawerItems } from "../taxonomies";

type IState = DrawerItems | null;

interface IDrawerContext {
    activeTab: IState,
    dispatchUpdateActiveTab: (value: { type: DrawerContextAction, payload: DrawerItems | null }) => void;
}

export enum DrawerContextAction {
    UPDATE = "update"
}

const initialState: IState = null;

const DrawerContext = React.createContext<IDrawerContext | undefined>(undefined);

const reducer = (state: IState, action: { type: DrawerContextAction, payload: DrawerItems | null }) => {
    switch (action.type) {
        case DrawerContextAction.UPDATE:
            return action.payload;

        default:
            return state;
    }
}

export const NavigationDrawerContextProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, dispatch] = useReducer(reducer, initialState);

    const dispatchUpdateActiveTab = (action: { type: DrawerContextAction, payload: DrawerItems | null }) => {
        dispatch(action)
    }

    return (
        <DrawerContext.Provider value={{ activeTab, dispatchUpdateActiveTab }}>
            {children}
        </DrawerContext.Provider>
    )
}

export const useNavigationDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useNavigationDrawerContext must be used within a NavigationDrawerContextProvider');
    }
    return context;
};


