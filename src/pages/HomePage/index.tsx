/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { up, down, between } from "styled-breakpoints";
import { scrollContent, ItemAnimatePresence } from "components/Tools";
import { themeType } from "features/theming";
import {
    ItemAnimated,
    BoxAnimated,
} from "components/Tools/Animation/BoxAnimated";
import { Anchor } from "components/Elements/Anchor";
import {
    faCubesStacked,
    faPizzaSlice,
    faLink,
    faCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetPageQuery } from "api-query/";
import { Spinner } from "components/Elements/Spinner";
import {
    ContentLoadingProblemNotFound,
    ContentLoadingProblemError,
} from "components/Elements/ContentLoadingProblem";
import { ComponentLazy } from "components/Elements/ComponentLazy";
const BoxStyled = styled(BoxAnimated)`
    --gap: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const ItemStyled = styled(ItemAnimated)`
    flex-basis: calc(
        calc(100% / var(--columns)) -
            calc(var(--gap) * calc(var(--columns) - 1) / var(--columns))
    );
    height: 180px;
    margin-top: var(--gap);
    margin-left: var(--gap);

    &:first-child {
        margin-top: 0;
    }
    ${up("xl")} {
        --columns: 3;
        &:nth-child(2),
        &:nth-child(3) {
            margin-top: 0;
        }
        &:nth-child(3n + 1) {
            margin-left: 0;
        }
    }
    ${between("md", "xl")} {
        --columns: 2;
        &:nth-child(2) {
            margin-top: 0;
        }
        &:nth-child(2n + 1) {
            margin-left: 0;
        }
    }
    ${down("md")} {
        --columns: 1;
        margin-left: 0;
    }
`;

const Container = styled(ComponentLazy)<{ theme?: themeType }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.firstLightMore};
    padding: 1rem;
    border: solid ${({ theme }) => theme.colors.firstLight};
    transition: border-color var(--transition), transform var(--transition),
        opacity var(--transition);
    .Header {
        .Icon {
            transition: color var(--transition);
        }
        .Title {
            font-weight: bold;
        }
    }
    &:hover {
        border-color: ${({ theme }) => theme.colors.third};
        .Header {
            .Icon {
                color: ${({ theme }) => theme.colors.third};
            }
        }
    }

    .Footer {
        display: flex;
        justify-content: flex-end;
        & > * + * {
            margin-left: 1rem;
        }
    }
`;
const ComponentInfo = ({ className, data }: any) => {
    const { name, desc, link, sandbox } = data;
    return (
        <Container>
            <div className="Header">
                <span className="Icon">
                    <FontAwesomeIcon icon={faPizzaSlice} />
                </span>

                <span className="Title">{name}</span>
            </div>
            <div className="Content">{desc}</div>
            <div className="Footer">
                {link && (
                    <Anchor
                        href={link}
                        className="Link"
                        target="_blank"
                        title="Go to page for more info"
                    >
                        <span className="Icon">
                            <FontAwesomeIcon icon={faLink} />
                        </span>
                    </Anchor>
                )}

                {sandbox && (
                    <Anchor
                        href={sandbox}
                        className="Link"
                        target="_blank"
                        title="Go to sandbox"
                    >
                        <span className="Icon">
                            <FontAwesomeIcon icon={faCode} />
                        </span>
                    </Anchor>
                )}
            </div>
        </Container>
    );
};
const Content = styled.div`
    .Icon {
        margin-right: 0.5rem;
    }
    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }
`;

export const HomePage = React.memo(() => {
    const { data, error, isLoading } = useGetPageQuery("homepage");
    React.useEffect(() => {
        document.title = "Home page";
        scrollContent(0);
    }, []);
    return (
        <Content>
            <ItemAnimatePresence>
                <h1>
                    <FontAwesomeIcon icon={faCubesStacked} /> Site ecosystem
                </h1>
            </ItemAnimatePresence>

            {error ? (
                <ContentLoadingProblemError />
            ) : isLoading ? (
                <Spinner />
            ) : data !== undefined ? (
                <BoxStyled>
                    {data.arrComponents.map((data: any, i: any) => (
                        <ItemStyled key={i}>
                            <ComponentInfo {...{ data }} />
                        </ItemStyled>
                    ))}
                </BoxStyled>
            ) : (
                <ContentLoadingProblemNotFound />
            )}
        </Content>
    );
});
