/**
 * Displays post with mobile friendly panel table of contents
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { useParams } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import { themeType, mUp, mDown } from "features/theming";
import { NavHeadersMobile } from "./NavHeadersMobile";
import { NavHeadersDesktop } from "./NavHeadersDesktop";
import { useGetNoteQuery } from "api-query/";
import { BlockContent } from "./BlockContent";
import { Spinner } from "components/Elements/Spinner";
import { ItemAnimatePresence, scrollContent } from "components/Tools";
import { CommentsComponent } from "../Comments";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
import { up, down } from "styled-breakpoints";
import {
    ContentLoadingProblemNotFound,
    ContentLoadingProblemError,
} from "components/Elements/ContentLoadingProblem";
const Container = styled.div`
    .ContainerContent {
        display: flex;
        flex-wrap: wrap;
        .BlockContent {
            ${up("lg")} {
                flex-basis: 69%;
                max-width: 69%;
            }
            ${down("lg")} {
                flex-basis: 100%;
            }
            transition: flex-basis var(--transition);
        }
        .NavHeadersDesktop {
            flex-basis: 30%;
            max-width: 30%;
        }
        .NavHeadersMobile {
            flex-basis: 100%;
        }
    }
`;

/**
 *
 */
export const NoteContent = withTheme(({ theme }: { theme: themeType }) => {
    React.useEffect(() => {
        scrollContent(0);
    }, []);
    // Get param from URL string
    const { noteSlug } = useParams<{
        noteSlug: string;
    }>();
    // load data
    const { data, error, isLoading } = useGetNoteQuery(noteSlug);

    return (
        <ItemAnimatePresence>
            {error ? (
                <ContentLoadingProblemError />
            ) : isLoading ? (
                <Spinner />
            ) : data instanceof Object ? (
                <Container>
                    <ErrorBoundary name="Content">
                        <div className="ContainerContent">
                            <BlockContent
                                data={data}
                                className={"BlockContent"}
                            />
                            <NavHeadersMobile
                                className={"NavHeadersMobile"}
                                isVisible={mDown("lg", theme.breakpoint)}
                            />
                            <NavHeadersDesktop
                                className={"NavHeadersDesktop"}
                                isVisible={mUp("lg", theme.breakpoint)}
                            />
                        </div>
                    </ErrorBoundary>
                    <ErrorBoundary name="Comments">
                        <CommentsComponent {...{ noteSlug }} />
                    </ErrorBoundary>
                </Container>
            ) : (
                <ContentLoadingProblemNotFound />
            )}
        </ItemAnimatePresence>
    );
});
