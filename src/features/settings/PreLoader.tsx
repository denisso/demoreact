import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useGetReadyServer, fetchGetReadyServer } from "./reducer";
import { useModal } from "components/Elements/CModal";
import { Spinner } from "components/Elements/Spinner";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * + * {
        margin: 1rem 0;
    }
`;

export const PreLoader = React.memo(() => {
    const dispatch = useDispatch();
    const { Modal, openModal, closeModal } = useModal("Welocome!");
    const isReady = useGetReadyServer();
    React.useEffect(() => {
        openModal();
    }, [openModal]);
    React.useEffect(() => {
        // first request in src\store\initStore.tsx
        if (isReady.value === false && isReady.counter > 0)
            setTimeout(() => dispatch(fetchGetReadyServer()), 1000);
        if (isReady.value === true) closeModal();
    }, [isReady, closeModal, dispatch]);
    return (
        <Modal>
            <Container>
                <div>Wait, the download is in progress.</div>
                <div>Everything will be ready soon</div>
                <Spinner />
            </Container>
        </Modal>
    );
});
