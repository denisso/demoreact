/**
 * @description Image without Lazy Loading
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { CForm, CFormProps } from ".";
import { useModal } from "../CModal";
import { ItemAnimatePresence } from "components/Tools";
import styled from "styled-components";
import { Spinner } from "../Spinner";
import { Button } from "../Button";

import { faFaceSadCry, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Container = styled.div`
    position: relative;
    .Middleware {
        .Submitted {
            position: absolute;
            top: 0;
            left: -0.5rem;
            width: calc(100% + 1rem);
            height: 100%;
            display: grid;
            place-items: center;
            background-color: ${({ theme }) => theme.colorRoot};
            .Icon {
                width: 3rem;
                height: auto;
            }
        }
    }
`;

export enum modalEnum {
    unset,
    loading,
    fulfilled,
    rejected,
}

const ModalComponent = React.memo(({
    title,
    onSubmit,
    schema,
    openFormModal,
    closeFormModal,
    processFormModal,
    options,
}: any) => {
    const [submit, setSubmit] = React.useState<boolean>(false);
    const submitRef = React.useRef<any>();
    const { Modal, openModal, closeModal } = useModal(title);
    const [stateMiddleWare, setStateMiddleWare] = React.useState<modalEnum>(
        modalEnum.unset
    );
    const processFormModalCb = React.useCallback(
        ({ payload }: { payload: modalEnum }) => {
            switch (payload) {
                case modalEnum.loading:
                    setStateMiddleWare(modalEnum.loading);
                    break;
                case modalEnum.fulfilled:
                    setStateMiddleWare(modalEnum.fulfilled);
                    break;
                case modalEnum.rejected:
                    setStateMiddleWare(modalEnum.rejected);
                    break;
                default:
            }
        },
        []
    );
    const middlewareRef = React.useRef<boolean>(false);
    const openModalCB = React.useCallback(() => {
        setSubmit(false);
        openModal();
    }, [openModal]);
    React.useEffect(() => {
        if (options?.middleware) {
            middlewareRef.current = true;
        }
        openFormModal(openModalCB);
        closeFormModal(closeModal);
        processFormModal(processFormModalCb);
    }, [openFormModal, closeFormModal, processFormModal, openModalCB, closeModal, processFormModalCb, options]);
    return (
        <Modal>
            <Container>
                <ItemAnimatePresence>
                    <div
                        className="Form"
                        style={{
                            transition: "opacity",
                            opacity: submit ? 0 : 1,
                        }}
                    >
                        <CForm
                            {...{
                                schema,
                                onSubmit: (...args) => {
                                    if (middlewareRef.current) {
                                        setSubmit(true);
                                        submitRef.current = args;
                                    }
                                    if (!submit) onSubmit(...args);
                                },
                                onCancel: () => {
                                    if (!submit) closeModal();
                                },
                            }}
                        />
                    </div>
                </ItemAnimatePresence>
                <div
                    className="Middleware"
                    style={{ display: submit ? "block" : "none" }}
                >
                    <ItemAnimatePresence
                        isVisible={stateMiddleWare === modalEnum.loading}
                        className="Submitted"
                    >
                        <div className="Message">
                            Please wait, the message will be sent soon...
                        </div>
                        <Spinner />
                    </ItemAnimatePresence>
                    <ItemAnimatePresence
                        isVisible={
                            stateMiddleWare === modalEnum.fulfilled ||
                            stateMiddleWare === modalEnum.rejected
                        }
                        className="Submitted"
                    >
                        <div className="Message">
                            {modalEnum.fulfilled
                                ? "The message was delivered!"
                                : "An error has occurred"}
                        </div>
                        <FontAwesomeIcon
                            className="Icon"
                            icon={
                                modalEnum.fulfilled ? faThumbsUp : faFaceSadCry
                            }
                        />
                        <Button onClick={() => closeModal()}>Ok</Button>
                    </ItemAnimatePresence>
                </div>
            </Container>
        </Modal>
    );
});

export const useFormModal = (title?: string, options?: Partial<{}>) => {
    const refOpenFormModal = React.useRef<Partial<() => void>>();
    const refCloseFormModal = React.useRef<Partial<() => void>>();
    const refProcessFormModal = React.useRef<Partial<() => void>>();
    const refArgs = React.useRef<Partial<{}>>();
    const refSubmitCb = React.useRef<Partial<(...args: any[]) => void>>();
    /**
     * 
     */
    const refOnSubmit = React.useCallback(
        (...args) => {
            if (refSubmitCb.current instanceof Function)
                refSubmitCb.current(...args, refArgs.current);
        },
        [refSubmitCb]
    );
    const openFormModal = React.useCallback((args?: Partial<{}>) => {
        if (refOpenFormModal.current instanceof Function) {
            refOpenFormModal.current();
            refArgs.current = args;
        }
    }, []);
    const closeFormModal = React.useCallback(() => {
        if (refCloseFormModal.current instanceof Function)
            refCloseFormModal.current();
    }, []);

    const processFormModal = React.useCallback(
        (arg: { payload: modalEnum }) => {
            if (refProcessFormModal.current instanceof Function)
                refProcessFormModal.current(arg);
        },
        []
    );

    const CFormModal = React.useMemo(() => {
        return ({ schema, onSubmit }: CFormProps) => {
            refSubmitCb.current = onSubmit;
            return (
                <ModalComponent
                    schema={schema}
                    onSubmit={refOnSubmit}
                    options={options}
                    openFormModal={(openFormModal: () => void) =>
                        (refOpenFormModal.current = openFormModal)
                    }
                    closeFormModal={(closeFormModal: () => void) =>
                        (refCloseFormModal.current = closeFormModal)
                    }
                    processFormModal={(processFormModal: () => void) =>
                        (refProcessFormModal.current = processFormModal)
                    }
                    title={title}
                />
            );
        };
    }, [options, refOnSubmit, title]);
    return {
        CFormModal,
        openFormModal,
        closeFormModal,
        processFormModal,
    };
};
