/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { CommentsHandler } from "./CommentsHandler";
import { CommentDataType } from "mocks/data/notes-comments";

type ReqResData = { error: any; payload?: any };

export enum operationEnum {
    undefined = "undefined",
    init = "init",
    insert = "insert",
    delete = "delete",
    update = "update",
}

export const useCommentsHandler = (noteSlug: string) => {
    const [data, setData] = React.useState<{
        comments: CommentDataType[];
        numComments: number;
    }>({
        comments: [],
        numComments: 0,
    });
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);
    // to update the data inside dispatch and not add a dependency to avoid re-creating the function dispatch
    const dataRef = React.useRef(data);
    const dispatch = React.useCallback(
        async ({ type, payload }: { type: operationEnum; payload?: {} }) => {
            // request
            let req: ReqResData = {
                error: false,
                payload: null,
            };

            try {
                if (type === operationEnum.init) {
                    setLoading(true);
                } else if (
                    CommentsHandler(dataRef.current)[`${type}Req`] instanceof
                    Function
                ) {
                    req = CommentsHandler(dataRef.current)[`${type}Req`](
                        payload
                    );
                    setData({
                        comments: [...dataRef.current.comments],
                        numComments: dataRef.current.numComments,
                    });
                }
            } catch (err) {
                req.error = "Req: type action not exist (err: werer4458)";
            }

            // response
            return new Promise((resolve) => {
                if (req.error) throw new Error(req.error);
                let optionsFetch = {};
                if (type !== operationEnum.init) {
                    optionsFetch = {
                        method: "POST",
                        body: JSON.stringify({ type, payload }),
                    };
                }

                fetch(`/api/comments/${noteSlug}`, optionsFetch)
                    .then((response: any) => response.json())
                    .then((responseData: ReqResData) => {
                        if (responseData.error) {
                            throw new Error("Res: " + responseData.error);
                        }

                        if (type === operationEnum.init) {
                            dataRef.current = responseData.payload;
                            setData({ ...dataRef.current });
                            resolve({ error: false });
                        } else {
                            const res: ReqResData = CommentsHandler(
                                dataRef.current
                            )[`${type}Res`](req.payload, responseData.payload);
                            if (res.error) throw new Error(res.error);

                            setData({ ...dataRef.current });
                            resolve(res);
                        }
                    })
                    .catch((error) => {
                        resolve({ error: error.message });
                    });
            }).catch((error) => ({ error: error.message }));
        },
        [noteSlug]
    );

    React.useEffect(() => {
        dispatch({ type: operationEnum.init }).then(
            ({ error, payload }: any) => {
                setLoading(false);
                if (error) {
                    setError(error);
                }
            }
        );
    }, [dispatch]);

    return { data, error, isLoading, dispatch };
};
