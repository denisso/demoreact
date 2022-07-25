/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { CommentDataType } from "mocks/data/notes-comments";
import { operationEnum } from "./useCommentsHandler";
function createUIDReq() {
    return "Req" + Date.now();
}
/**
 * Handle operation with comments: insert, delete, update
 * with feature: optimistic update
 * commentary processing: new, update, delete, null - no processing
 * @param arr
 * @returns
 */
export enum processingEnum {
    noProcessing = "noProcessing",
    new = "new",
    delete = "delete",
    update = "update",
}

export const CommentsHandler = (inputData: {
    comments: CommentDataType[];
    numComments: number;
}): { [key: string]: any } => {
    const handleError = (cb: any) => {
        try {
            return { error: false, payload: cb() };
        } catch (err: any) {
            return { error: err.message || true };
        }
    };
    /**
     * node,  nodeParent,  nodeChild
     * - in some situations, we may need only one of these arguments, in this case we can use "node"
     * - in some situations, we may need two of these arguments, in this case, you need to know which element is "parent" and which is "child"
     * array can be inputData.arrComments or node.child
     * indx - index of the node in array
     */
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
        child: boolean = false
    ) => {
        if (commentid === undefined) {
            return cb({ array: inputData.comments });
        }
        for (
            let parentIndx = 0,
                node: CommentDataType = inputData.comments[parentIndx];
            parentIndx < inputData.comments.length;
            parentIndx++, node = inputData.comments[parentIndx]
        ) {
            if (node.commentid === commentid) {
                return cb({
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
                        nodeParent: node,
                        nodeChild: node.child[childIndex],
                        array: node.child,
                        indx: childIndex,
                    });
                }
            }
        }
        throw new Error("commentid not exist");
    };
    return {
        insertReq: (commentData: CommentDataType) =>
            handleError(() => {
                const { parentid, picture, name, comment, userid } =
                    commentData;
                return handleComment(parentid, ({ nodeParent, array }: any) => {
                    const reqid: string = createUIDReq();

                    const newComment = {
                        parentid,
                        picture,
                        comment,
                        name,
                        userid,
                        commentid: reqid,
                        child: [],
                        processing: processingEnum.new,
                    };

                    if (parentid) {
                        // child comment
                        nodeParent.child.push(newComment);
                    } else {
                        // root comment
                        array.push(newComment);
                    }

                    return { reqid, type: operationEnum.insert };
                });
            }),
        insertRes: (req: any, res: any) =>
            handleError(() => {
                const { reqid }: any = req;
                const { comment }: any = res;
                return handleComment(
                    reqid,
                    ({ nodeParent, nodeChild }: any) => {
                        if (comment.parentid) {
                            nodeChild = Object.assign(nodeChild, comment);
                            nodeChild.processing = processingEnum.noProcessing;
                        } else {
                            nodeParent = Object.assign(nodeParent, comment);
                            nodeParent.processing = processingEnum.noProcessing;
                        }
                        inputData.numComments += 1;
                        return { reqid };
                    },
                    true
                );
            }),
        deleteReq: (comment: CommentDataType) =>
            handleError(() => {
                const { commentid }: any = comment;
                return handleComment(
                    commentid,
                    ({ nodeChild, nodeParent }: any) => {
                        const node = nodeChild || nodeParent;
                        node.processing = processingEnum.delete;
                        if (node.child && node.child.length) {
                            node.child.forEach(
                                (e: any) =>
                                    (node.processing = processingEnum.delete)
                            );
                        }
                        return {
                            reqid: createUIDReq(),
                            type: operationEnum.delete,
                            commentid,
                        };
                    },
                    true
                );
            }),
        deleteRes: (req: any, res: any) =>
            handleError(() => {
                const { commentid }: any = res;
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
        updateReq: ({ commentid, comment }: CommentDataType) =>
            handleError(() => {
                return handleComment(
                    commentid,
                    ({ nodeChild, nodeParent }: any) => {
                        const node = nodeChild || nodeParent;
                        node.comment = comment;
                        node.processing = processingEnum.update;
                        return {
                            reqid: createUIDReq(),
                            type: operationEnum.update,
                            commentid,
                            comment,
                        };
                    },
                    true
                );
            }),
        updateRes: (req: any, res: any) =>
            handleError(() => {
                const { commentid }: any = res;
                return handleComment(
                    commentid,
                    ({ nodeChild, nodeParent, array }: any) => {
                        let node = nodeChild || nodeParent;
                        const index = array.findIndex(
                            (element: CommentDataType) => element === node
                        );
                        const nodeUpadte = Object.assign({}, node);
                        nodeUpadte.processing = processingEnum.noProcessing;
                        array.splice(index, 1, nodeUpadte);
                        return { commentid };
                    },
                    true
                );
            }),
    };
};
