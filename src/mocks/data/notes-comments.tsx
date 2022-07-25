/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { uid } from "tools/uid";

function createUid() {
    return Date.now() + "" + uid();
}
export type CommentDataType = {
    commentid: string;
    parentid: string;
    userid: string;
    name: string; // no exist in comments array, get from users. The field is added only when comments are requested from the server.
    picture: string; // no exist in comments array, get from users. The field is added only when comments are requested from the server.
    // processing not implemented yet
    processing?: any; // only for Client Tree
    comment: string;
    child: CommentDataType[];
    date: number; // created on the server
};

export const CommentsHandlerServer = ({
    comments: CommentsDataArray,
    slug,
    users,
    currentUserID,
}: {
    comments: {
        [key: string]: { comments: CommentDataType[]; numComments: number };
    };
    slug: string;
    users: { [key: string]: any };
    currentUserID: string | null | undefined;
}): { [key: string]: any } => {
    const inputData =
        CommentsDataArray[slug] ||
        (CommentsDataArray[slug] = { numComments: 0, comments: [] });
    const handleError = (cb: any) => {
        try {
            return { error: false, payload: cb() };
        } catch (err: any) {
            return { error: err.message || true };
        }
    };
    type cbFuntionType = (args: {
        node?: CommentDataType;
        nodeParent?: CommentDataType;
        nodeChild?: CommentDataType;
        array?: CommentDataType[];
        indx?: number;
    }) => any;
    const handleComment = (
        commentid: string | undefined,
        cb: cbFuntionType,
        child = false
    ) => {
        if (commentid === undefined) {
            return cb({ array: inputData.comments });
        }
        for (
            let parentIndx = 0, node = inputData.comments[parentIndx];
            parentIndx < inputData.comments.length;
            parentIndx++, node = inputData.comments[parentIndx]
        ) {
            if (node.commentid === commentid) {
                return cb({
                    node,
                    nodeParent: node,
                    array: inputData.comments,
                    indx: parentIndx,
                });
            }
            if (child) {
                const childIndex =
                    node.child instanceof Array
                        ? node.child.findIndex(
                              (e: any) => e.commentid === commentid
                          )
                        : -1;
                if (node.child instanceof Array && childIndex !== -1) {
                    return cb({
                        node,
                        nodeParent: node,
                        nodeChild: node.child[childIndex],
                        array: node.child,
                        indx: childIndex,
                    });
                }
            }
        }
        throw new Error("id not found");
    };
    /**
     * Append comment for Fulfilled
     * @param commentData
     * @returns
     */
    const completeComment = (commentData: CommentDataType): CommentDataType => {
        const commentid: string = createUid();
        const userid = currentUserID;
        const { parentid, comment, date = Date.now() }: CommentDataType = commentData;
        if (!userid) throw new Error("user not defined");

        return {
            commentid,
            parentid,
            userid,
            name: users[userid] ? users[userid].name : "noname",
            picture: users[userid] ? users[userid].picture : "nopicture",
            comment,
            child: [],
            date,
        };
    };

    return {
        insert: (commentData: CommentDataType) =>
            handleError(() => {
                const { parentid }: any = commentData;
                return handleComment(parentid, ({ array, nodeParent }: any) => {
                    const newComment = completeComment(commentData);
                    if (parentid) {
                        nodeParent.child.push(newComment);
                    } else {
                        array.push(newComment);
                    }
                    inputData.numComments += 1;
                    return {
                        comment: newComment,
                        numComments: inputData.numComments,
                    };
                });
            }),
        delete: (comment: string) =>
            handleError(() => {
                const { commentid }: any = comment;
                return handleComment(
                    commentid,
                    ({ array, indx }: any) => {
                        if (array[indx].child && array[indx].child.length) {
                            inputData.numComments -= array[indx].child.length;
                        }
                        inputData.numComments -= 1;
                        array.splice(indx, 1);
                        return { commentid };
                    },
                    true
                );
            }),
        update: ({ comment, commentid }: CommentDataType) =>
            handleError(() => {
                return handleComment(
                    commentid,
                    ({ nodeChild, nodeParent }: any) => {
                        const node = nodeChild || nodeParent;
                        node.comment = comment;
                        return { commentid };
                    },
                    true
                );
            }),
    };
};
export type CommentsSlugType = {
    comments: CommentDataType[];
    numComments: number;
};
const comments: { [key: string]: CommentsSlugType } = {};

export { comments };
