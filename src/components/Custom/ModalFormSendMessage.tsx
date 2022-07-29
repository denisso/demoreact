/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { useFormModal, schemaForm, modalEnum } from "components/Elements/CForm";
import emailjs from "@emailjs/browser";
import { message_key } from "settings-demo-project";
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

type FormFieldsType = {
    name: string;
    email: string;
    message: string;
};
export const ModalFormSendMessage = React.memo(
    ({ openFormModalCB }: { openFormModalCB: (callback: any) => void }) => {
        const { CFormModal, openFormModal, processFormModal } = useFormModal(
            "Send message",
            {
                middleware: true,
            }
        );
        const onSubmit = React.useCallback(
            (fields: FormFieldsType, { setSubmitting }: any) => {
                processFormModal({ payload: modalEnum.loading });
                emailjs
                    .send(
                        message_key.service,
                        message_key.template,
                        // field from template EmailJS
                        {
                            contact_name: fields.name,
                            contact_email: fields.email,
                            contact_message: fields.message,
                        },
                        message_key.api
                    )
                    .then(
                        () => {
                            processFormModal({ payload: modalEnum.fulfilled });
                            setSubmitting(false);
                        },
                        () => {
                            processFormModal({ payload: modalEnum.rejected });
                            setSubmitting(false);
                        }
                    );
            },
            [processFormModal]
        );
        React.useEffect(() => {
            openFormModalCB(openFormModal);
        }, [openFormModalCB, openFormModal]);
        return <CFormModal {...{ schema, onSubmit }} />;
    }
);
