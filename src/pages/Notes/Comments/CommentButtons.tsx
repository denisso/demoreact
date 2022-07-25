/**
 * Split logic  to separate component
 * Logic:
 * Reply - create parent comment, create child comment
 * Delete comment
 * Edit comment
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { ItemAnimatePresence } from "components/Tools";
import { schemaForm, CForm } from "components/Elements/CForm";
import { Context, contextType } from "./Context";
import { Button, ButtonTypesENUM } from "components/Elements/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";
import { CommentDataType } from "mocks/data/notes-comments";
import { operationEnum } from "./useCommentsHandler";
import { processingEnum } from "./CommentsHandler";

const CommentButtonsStyled = styled.div`
    display: flex;
    .CommentControlButtons {
        display: flex;
        & > * + * {
            margin-left: 1rem;
        }
    }
    .CommentForm {
        flex: 1;
    }
`;

const schema: schemaForm = [
    {
        name: "message",
        label: "Text comment:",
        type: "textarea",
        required: true,
        options: { placeholder: "Your message..." },
    },
];

export const CommentButtons = React.memo(
    ({
        className,
        comment,
    }: {
        className?: string;
        comment: CommentDataType;
    }) => {
        const [showReplyForm, setShowReplyForm] = React.useState(false);
        /**
         * dispatch - function for add, delete, update comment data type ()=>{}
         * currentComment - current comment being processed type Ref
         */
        const { dispatch, currentComment, setCurrentComment } =
            React.useContext<contextType>(Context);

        // const { commentid, parentid } = comment || {};
        const { currentUserID, credentials } = useSelector(selectSignInState);
        // not uses in jsx,
        // uses as shared varable between button action,
        // then middleware form,
        // then use this typeAction in handler submit
        const refTypeAction = React.useRef<operationEnum>(
            operationEnum.undefined
        );
        // disable button Reply  when another comment is processing 
        const [disable, setDisable] = React.useState(1);
        const disableRef = React.useRef<number>(disable);
        disableRef.current = disable;

        React.useEffect(() => {
            const disable: number =
                currentComment !== "" && currentComment !== comment.commentid
                    ? 1
                    : 0;
            setDisable(disable);
        }, [currentComment, comment]);

        // submit comment for insert or update
        const onSubmit = React.useCallback(
            (values: any, actions: any) => {
                if (disableRef.current) return;
                actions.resetForm();
                setCurrentComment("");
                setShowReplyForm(false);
                dispatch({
                    type:
                        refTypeAction.current === operationEnum.insert
                            ? operationEnum.insert
                            : operationEnum.update,
                    payload: {
                        parentid: comment.parentid || comment.commentid,
                        commentid: comment.commentid,
                        comment: values.message,
                        userid: currentUserID,
                        picture: credentials.picture,
                        name: credentials.name,
                    },
                });
            },
            [comment, credentials, currentUserID, dispatch, setCurrentComment]
        );
        // Close Form without submit
        const onCancel = React.useCallback(() => {
            if (disableRef.current) return;
            setCurrentComment("");
            refTypeAction.current = operationEnum.undefined;
            setShowReplyForm(false);
        }, [setCurrentComment]);
        // delete comment
        const onDelete = React.useCallback(() => {
            if (disableRef.current) return;
            dispatch({
                type: operationEnum.delete,
                payload: {
                    commentid: comment.commentid,
                },
            });
        }, [comment, dispatch]);
        // open form for update
        const onUpdate = React.useCallback(() => {
            if (disableRef.current) return;
            refTypeAction.current = operationEnum.update;
            setShowReplyForm(true);
            setCurrentComment(comment.commentid);
        }, [comment, setCurrentComment]);
        // open form for reply
        const onReply = React.useCallback(() => {
            if (disableRef.current) return;
            refTypeAction.current = operationEnum.insert;
            setShowReplyForm(true);
            setCurrentComment(comment.commentid);
        }, [comment, setCurrentComment]);

        return (
            <CommentButtonsStyled className={className}>
                <ItemAnimatePresence
                    isVisible={!showReplyForm}
                    className="CommentControlButtons"
                >
                    {/* button reply shows if comment no noProcessing*/}
                    {comment && comment.processing === processingEnum.noProcessing && (
                        <Button onClick={onReply} disable={disable}>
                            Reply
                        </Button>
                    )}
                    {/* user owner comment can edit/delete this comment */}
                    {comment &&
                        comment.processing === processingEnum.noProcessing &&
                        currentUserID === comment.userid && (
                            <>
                                <Button onClick={onUpdate} disable={disable}>
                                    Update
                                </Button>
                                <Button
                                    onClick={onDelete}
                                    disable={disable}
                                    type={ButtonTypesENUM.alarm}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                </ItemAnimatePresence>
                <ItemAnimatePresence
                    isVisible={showReplyForm}
                    className={"CommentForm"}
                >
                    <CForm
                        {...{
                            schema,
                            onSubmit,
                            onCancel,
                        }}
                    />
                </ItemAnimatePresence>
            </CommentButtonsStyled>
        );
    }
);

export const ReplyButton = React.memo(
    ({ className }: { className: string }) => {
        const { dispatch }: any = React.useContext(Context);
        const onSubmit = React.useCallback(
            (values: any, actions: any) => {
                actions.resetForm();
                dispatch({
                    type: operationEnum.insert,
                    payload: {
                        comment: values.message,
                    },
                });
            },
            [dispatch]
        );
        return (
            <>
                <CForm
                    {...{
                        schema,
                        onSubmit,
                    }}
                />
            </>
        );
    }
);
