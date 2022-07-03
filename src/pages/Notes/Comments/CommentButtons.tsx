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
import { AnimateItem } from "components/Tools";
import { schemaForm, CForm } from "components/Elements/CForm";
import { Context } from "./Context";
import { Button } from "components/Elements/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";
import { CommentDataType } from "mocks/data/notes-comments";
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
export const CommentButtons = ({
    className,
    comment = {},
}: {
    className?: string;
    comment: CommentDataType;
}) => {
    const [showReplyForm, setShowReplyForm] = React.useState(false);
    /**
     * dispatch - function for add, delete, update comment data type ()=>{}
     * currentComment - current comment being processed type Ref
     */
    const { dispatch, currentComment, setCurrentComment }: any =
        React.useContext(Context);
    const { commentid, parentid } = comment || {};
    const { currentUserID, credentials } = useSelector(selectSignInState);
    const refTypeAction = React.useRef<string | null>("");
    const [disable, setDisable] = React.useState(1);
    const disableRef = React.useRef<number>(disable);
    disableRef.current = disable;

    React.useEffect(() => {
        const disable: number =
            currentComment !== "" && currentComment !== commentid ? 1 : 0;
        setDisable(disable);
    }, [currentComment]);

    // submit comment for insert or update
    const onSubmit = React.useCallback((values: any, actions: any) => {
        if (disableRef.current) return;
        actions.resetForm();
        setCurrentComment("");
        setShowReplyForm(false);
        dispatch({
            type: refTypeAction.current === "insert" ? "insert" : "update",
            payload: {
                parentid: parentid || commentid,
                commentid,
                comment: values.message,
                userid: currentUserID,
                picture: credentials.picture,
                name: credentials.name
            },
        });
    }, []);
    // Close Form without submit
    const onCancel = React.useCallback(() => {
        if (disableRef.current) return;
        setCurrentComment("");
        refTypeAction.current = null;
        setShowReplyForm(false);
    }, []);
    // delete comment
    const onDelete = React.useCallback(() => {
        if (disableRef.current) return;
        dispatch({
            type: "delete",
            payload: {
                commentid,
            },
        });
    }, []);
    // open form for update
    const onUpdate = React.useCallback(() => {
        if (disableRef.current) return;
        refTypeAction.current = "update";
        setShowReplyForm(true);
        setCurrentComment(commentid);
    }, []);
    // open form for reply
    const onReply = React.useCallback(() => {
        if (disableRef.current) return;
        refTypeAction.current = "insert";
        setShowReplyForm(true);
        setCurrentComment(commentid);
    }, []);

    return (
        <CommentButtonsStyled className={className}>
            <AnimateItem
                isVisible={!showReplyForm}
                className="CommentControlButtons"
            >
                {comment && !comment.processing && (
                    <Button onClick={onReply} disable={disable}>
                        Reply
                    </Button>
                )}
                {comment &&
                    !comment.processing &&
                    currentUserID == comment.userid && (
                        <>
                            <Button onClick={onUpdate} disable={disable}>
                                Update
                            </Button>
                            <Button
                                onClick={onDelete}
                                disable={disable}
                                type={"alarm"}
                            >
                                Delete
                            </Button>
                        </>
                    )}
            </AnimateItem>
            <AnimateItem isVisible={showReplyForm} className={"CommentForm"}>
                <CForm
                    {...{
                        schema,
                        onSubmit,
                        onCancel,
                    }}
                />
            </AnimateItem>
        </CommentButtonsStyled>
    );
};

export const ReplyButton = ({ className }: { className: string }) => {
    const { dispatch }: any = React.useContext(Context);
    const onSubmit = React.useCallback((values: any, actions: any) => {
        actions.resetForm();
        dispatch({
            type: "insert",
            payload: {
                comment: values.message,
            },
        });
    }, []);
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
};
