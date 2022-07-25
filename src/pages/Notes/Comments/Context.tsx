/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { operationEnum } from "./useCommentsHandler";
import { CommentDataType } from "mocks/data/notes-comments";
export type contextType = {
    /**
     * dispatch actions to manage CRUD operations of comments
     * Examples:
     * dispatch ({type: "init/insert/update/delete", payload: {...}}).then(response=> processing response)
     * dispatch ({type: "init" }) - get all comments from server, run once in hook useRequestData
     * dispatch ({type: "insert", payload: {idcomment: "id parent comment", comment: "string"} }) - insert comment
     * dispatch ({type: "delete", payload: {idcomment: "id comment"} }) - delete comment
     * dispatch ({type: "update", payload: {idcomment: "id comment", comment: "new string comment"} }) - update comment
     */
    dispatch: (arg: { type: operationEnum; payload?: Partial<CommentDataType> }) => void;
    /**
     * Used to control the display of the comment dialog
     * const [currentComment, setCurrentComment] = React.useState(null);
     * currentComment: string|null
     * setCurrentComment: (string)=>void
     */
    currentComment: string;
    setCurrentComment: (arg: string) => void;
};

export const Context = React.createContext<contextType>({
    dispatch: () => {},
    currentComment: "",
    setCurrentComment: () => {},
});
