/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "./useInfiniteQuery";
import { up } from "styled-breakpoints";

import { themeType } from "features/theming";
import { Spinner } from "components/Elements/Spinner";
import { scrollContent } from "components/Tools";
import { BoxAnimated } from "components/Tools/Animation/BoxAnimated";

import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ContentLoadingProblemNotFound,
    ContentLoadingProblemError,
} from "components/Elements/ContentLoadingProblem";
import { PagesContext, PagesContextType } from "pages";
import { NoteDataType } from "mocks/data/notes";
import { NoteContainerMemo } from "./NoteCantainer";
import { ItemAnimatePresence } from "components/Tools";
const NotesListStyle = styled(BoxAnimated)<{ theme: themeType }>`
    display: grid;
    gap: var(--gap);
    place-items: center;
    ${up("lg")} {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Content = styled.div`
    .Icon {
        margin-right: 0.5rem;
    }
    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }
`;

export const NotesListWithFilter = React.memo(() => {
    const { intersect }: PagesContextType = React.useContext(PagesContext);
    React.useEffect(() => {
        scrollContent(0, 0);
        document.title = "Notes List";
    }, []);
    const { data, error, isLoading, last, fetchNextPage } = useInfiniteQuery();
    const triggerElement = React.useRef<HTMLElement | null>();
    const [infinity, setInfinity] = React.useState(false);
    const trigger = React.useCallback(
        ({ entity }: any) => {
            if (!triggerElement.current) return;
            if (entity.isIntersecting) {
                setInfinity(false);
                intersect.removeNodes(triggerElement.current);
                fetchNextPage();
            }
        },
        [fetchNextPage, intersect]
    );

    const infinityCallback = React.useCallback(() => {
        setInfinity(true);
    }, []);
    React.useEffect(() => {
        if (infinity && !last && !error && !isLoading && triggerElement.current) {
            intersect.addNodes({ node: triggerElement.current, trigger });
        }
    }, [infinity, last, error, isLoading, intersect, trigger]);
    return (
        <Content>
            <ItemAnimatePresence>
                <h1>
                    <FontAwesomeIcon icon={faBookOpenReader} className="Icon" />
                    Notes
                </h1>
            </ItemAnimatePresence>
            <>
                {data && data instanceof Array && (
                    <NotesListStyle className="NotesList">
                        {data instanceof Array &&
                            data.map((noteData: NoteDataType, i: number) => {
                                return (
                                    <NoteContainerMemo
                                        key={noteData.id}
                                        noteData={noteData}
                                        infinity={
                                            i === data.length - 1 &&
                                            infinityCallback
                                        }
                                    />
                                );
                            })}
                    </NotesListStyle>
                )}
            </>
            <div
                className="InfiniteScrollTrigger"
                ref={(node) => {
                    if (node && !triggerElement.current) {
                        triggerElement.current = node;
                    }
                }}
            ></div>
            <ItemAnimatePresence isVisible={error}>
                <ContentLoadingProblemError />
            </ItemAnimatePresence>
            <ItemAnimatePresence isVisible={isLoading}>
                <Spinner />
            </ItemAnimatePresence>
            <ItemAnimatePresence isVisible={!data && !error && !isLoading}>
                <ContentLoadingProblemNotFound />
            </ItemAnimatePresence>
        </Content>
    );
});
