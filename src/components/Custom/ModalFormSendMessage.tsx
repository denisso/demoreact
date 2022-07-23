import React from "react";
import { useFormModal, schemaForm, modalEnum } from "components/Elements/CForm";

const schema: schemaForm = [
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        options: { placeholder: "Name" },
    },
    {
        name: "email",
        label: "EMail",
        type: "email",
        required: true,
        options: { placeholder: "example@mail.com" },
    },
    {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        options: { placeholder: "Your message..." },
    },
];

export const ModalFormSendMessage = ({
    openFormModalCB,
}: {
    openFormModalCB: (callback: any) => void;
}) => {
    const { CFormModal, openFormModal, processFormModal } =
        useFormModal("Fake Send message (under development)", {
            middleware: true,
        });
    const onSubmit = React.useCallback(
        (values: any, { setSubmitting }: any) => {
            processFormModal({ payload: modalEnum.loading });
            setTimeout(() => {
                processFormModal({ payload: modalEnum.fulfilled });
                setSubmitting(false);
            }, 1400);
        },
        [processFormModal]
    );
    React.useEffect(()=>{
        openFormModalCB(openFormModal)
    },[openFormModalCB, openFormModal])
    return <CFormModal {...{ schema, onSubmit }} />;
};
