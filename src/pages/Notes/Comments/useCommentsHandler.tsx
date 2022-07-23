/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { CommentsHandler } from "./CommentsHandler";
import { CommentDataType } from "mocks/data/notes-comments";

type ReqResData = { error: any; payload?: any };

export const useCommentsHandler = (noteSlug: string) => {
    const [data, setData]: any = React.useState<{
        comments: CommentDataType[];
        numComments: number;
    }>({
        comments: [],
        numComments: 0,
    });
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);
    const dataRef = React.useRef(data);
    const dispatch = React.useCallback(
        async ({ type, payload }: { type: string; payload?: {} }) => {
            // request
            let req: ReqResData = {
                error: false,
                payload: null,
            };

            try {
                if (type === "init") {
                    setLoading(true);
                } else {
                    req = CommentsHandler(dataRef.current)[`${type}Req`](
                        payload
                    );
                    setData({ ...dataRef.current });
                }
            } catch (err) {
                req.error = "Req: type action not exist (err: werer4458)";
            }

            // response
            return new Promise((resolve) => {
                if (req.error) throw new Error(req.error);
                let optionsFetch = {};
                if (type !== "init") {
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

                        if (type === "init") {
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
        dispatch({ type: "init" }).then(({ error, payload }: any) => {
            setLoading(false);
            if (error) {
                setError(error);
            }
        });
    }, [dispatch]);

    return { data, error, isLoading, dispatch };
};
