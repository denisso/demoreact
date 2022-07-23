/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { BlockHero } from "./Blocks/Hero";
import { BlockSection } from "./Blocks/Section";
import { BlockScores } from "./Blocks/Scores";
import { ComponentLazy } from "components/Elements/ComponentLazy";
import styled from "styled-components";

const Components: any = {
    Hero: BlockHero,
    Section: BlockSection,
    Scores: BlockScores,
};

const Wrapper = styled.div`
    display: flex;
    min-height: 150px;
    > .LeftSide,
    > .RightSide {
        width: 1rem;
        border: solid;
        border-color: transparent;
        transition: border-color var(--transition);
    }
    > .LeftSide {
        border-right: none;
    }

    > .RightSide {
        border-left: none;
    }
    &:hover .LeftSide,
    &:hover .RightSide {
        border-color: ${({ theme }) => theme.colors.third};
    }
    > .Children {
        padding: 1rem 0;
        flex: 1;
    }
`;

const Dummy = () => <></>;

export const Blocks = React.memo(({ className, data }: any) => {
    return (
        <div className={className}>
            {data.map((blockData: any, i: number) =>
                Components[blockData.type] ? (
                    <ComponentLazy className={className} key={blockData.name}>
                        <Wrapper>
                            <div className="LeftSide"></div>
                            <div className="Children">
                                {React.createElement(
                                    Components[blockData.type],
                                    {
                                        data: blockData
                                    }
                                )}
                            </div>
                            <div className="RightSide"></div>
                        </Wrapper>
                    </ComponentLazy>
                ) : (
                    <Dummy />
                )
            )}
        </div>
    );
});
