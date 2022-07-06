/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
import { PreLoader } from "features/settings/PreLoader";
import { useGetReady } from "features/settings/reducer";
import { AnimateItem } from "components/Tools";

const MainWrapper = styled.main`
    padding: 2rem 0;
`;

const MainContainer = styled.div.attrs({ className: "container" })`
    border-bottom-left-radius: var(--borderRadiusBlock);
    border-bottom-right-radius: var(--borderRadiusBlock);
    min-height: 40vh;
`;

export const Main = () => {
    const isReady = useGetReady()
    return (
        <MainWrapper>
            <MainContainer>
                <ErrorBoundary name="MainComponent">
                    <AnimateItem isVisible={!isReady}>
                        <PreLoader />
                    </AnimateItem>
                    <AnimateItem isVisible={isReady}>
                        <Outlet />
                    </AnimateItem>
                </ErrorBoundary>
            </MainContainer>
        </MainWrapper>
    );
};
