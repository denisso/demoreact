/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { Avatar } from "components/Elements/Avatar";
import styled from "styled-components";
import { CommentButtons } from "./CommentButtons";
import { CommentDataType } from "mocks/data/notes-comments";

const CommentStyled = styled.div.attrs({ className: "CommentContainer" })`
    display: flex;
    flex-direction: column;

    .Comment {
        display: flex;
        flex-direction: column;

        padding: 0.5rem;
        background: ${({ theme }) => theme.colors.thirdLightMore};
        & > * + * {
            margin-top: 1rem;
        }
        .CommentContent {
            margin-left: 0.3rem;
            padding: 1rem;
            background: ${({ theme }) => theme.colors.colorRoot};
            border-radius: var(--borderRadiusBlock);
        }
        .CommentInfoData {
            display: flex;
            align-items: center;
            a {
                text-decoration: underline;
            }
            & > * + * {
                margin-left: 1rem;
            }
            .CommentHash {
            }
            .CommentAvatar {
                width: 2rem;
                height: 2rem;
                * {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
        }
    }

    .CommentsChild {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5rem;
        .CommentsChildContainer {
            flex-basis: 100%;
            display: flex;
            .CommentsChildOffsetLeft {
                width: 0.3rem;
                background: ${({ theme }) => theme.colors.third};
            }
            .CommentContainer {
                flex: 1;
            }
        }

        .CommentsChildContainer + .CommentsChildContainer {
            margin-top: 0.5rem;
        }
    }
`;

const Comment = React.memo(
    ({
        comment,
        children,
    }: {
        comment: CommentDataType;
        children?: any | any[];
    }) => {
        return (
            <CommentStyled>
                <div className="Comment" id={comment.commentid}>
                    <div className="CommentInfoData">
                        <div className="CommentHash">
                            Comment id:{" "}
                            <a href={"#" + comment.commentid}>
                                {"#" + comment.commentid}
                            </a>
                        </div>
                    </div>
                    <div className="CommentContent">{comment.comment}</div>
                    <div className="CommentInfoData">
                        <Avatar
                            className="CommentAvatar"
                            src={comment.picture}
                        />
                        <div className="CommentUserName">
                            <b>{comment.name}</b>
                        </div>
                        <div className="CommentDate">
                            {comment.date &&
                                "Published at : " +
                                    new Date(
                                        Number(comment.date) || Date.now()
                                    ).toUTCString()}
                        </div>
                    </div>
                    <CommentButtons
                        className="CommentButtons"
                        {...{ comment }}
                    />
                </div>

                {children}
            </CommentStyled>
        );
    }
);
Comment.displayName = "Comment";
const CommentsRender = React.memo(
    ({ comments }: { comments: CommentDataType[] }) => {
        return (
            <>
                {comments instanceof Array &&
                    comments.map((comment: CommentDataType) => {
                        return (
                            <Comment key={comment.commentid} comment={comment}>
                                {comment.child instanceof Array &&
                                    comment.child.length > 0 && (
                                        <div className="CommentsChild">
                                            {comment.child.map(
                                                (child: CommentDataType) => (
                                                    <div
                                                        key={child.commentid}
                                                        className="CommentsChildContainer"
                                                    >
                                                        <div className="CommentsChildOffsetLeft"></div>
                                                        <Comment
                                                            comment={{
                                                                ...child,
                                                                parentid:
                                                                    comment.commentid,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </Comment>
                        );
                    })}
            </>
        );
    }
);
CommentsRender.displayName = "CommentsRender";
export { CommentsRender };
