/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { ItemAnimated } from "components/Tools/Animation/BoxAnimated";
import { themeType } from "features/theming";
import { ComponentLazy } from "components/Elements/ComponentLazy";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
const NoteContainerStyle = styled(ItemAnimated)<{ theme: themeType }>`
    width: 100%;
    height: 150px;

    .NoteContainer {
        display: block;
        background: ${({ theme }) => theme.colors.firstLightMore};
        border-radius: var(--borderRadiusBlock);
        height: 100%;
        border-radius: var(--borderRadiusBlock);
        overflow: hidden;
        border: solid transparent;
        transition: border-color var(--transition),
            background-color var(--transition), color var(--transition);
        &:hover {
            border: solid ${({ theme }) => theme.colors.third};
        }
        .NoteBlock {
            display: flex;
            height: 100%;
            /* align-items: center; */
            .NoteImage {
                min-width: 150px;
                max-width: 150px;
                display: flex;
                align-items: center;
                /* border-radius: var(--borderRadiusBlock); */
                /* overflow: hidden; */
                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .NoteContent {
                flex-grow: 1;
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                & > * {
                    display: flex;
                    align-items: center;
                }
                .NoteTitle {
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .NoteExcerpt {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    overflow: hidden;
                    max-height: 75px;
                }
                .NoteMeta {
                    display: flex;
                    .WrittenBy {
                        display: flex;
                        .Author {
                            margin-right: 1rem;
                        }
                    }
                }
            }
        }
    }
`;

const NoteContainer = ({ noteData, infinity }: any) => {
    const ref = React.useRef<any>();

    return (
        <NoteContainerStyle>
            <ComponentLazy>
                <NavLink
                    to={`/notes/${noteData.slug}`}
                    className="NoteContainer"
                >
                    <div
                        className="NoteBlock"
                        ref={(node) => {
                            if (node && !ref.current) {
                                ref.current = node;
                                if (typeof infinity === "function") {
                                    infinity();
                                }
                            }
                        }}
                    >
                        <div className="NoteImage">
                            <img src={noteData.icon} alt={"article"} />
                        </div>
                        <div className="NoteContent">
                            <div className="NoteTitle">{noteData.title}</div>
                            <div className="NoteMeta">
                                <div className="WrittenBy">
                                    <div className="Author">
                                        <span>{noteData.author.name}</span>
                                    </div>
                                    <div className="WriteAt">
                                        {`${new Date(
                                            noteData.createdAt
                                        ).getFullYear()} /
                            ${new Date(noteData.createdAt).getMonth() + 1} /
                            ${new Date(noteData.createdAt).getDate()}`}
                                    </div>
                                </div>
                            </div>
                            <div className="NoteMeta">
                                <div className="Coments">
                                    <FontAwesomeIcon
                                        icon={faComment}
                                        className="Icon"
                                    />{" "}
                                    {noteData.numComments}
                                </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </ComponentLazy>
        </NoteContainerStyle>
    );
};
export const NoteContainerMemo = React.memo(NoteContainer);
