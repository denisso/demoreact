/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "./fields/TextField";
import { TextArea } from "./fields/TextArea";
import { validationSchemaGenerator } from "./helpers";
import { Button, ButtonSubmit } from "../Button";
import styled from "styled-components";

const types: { [key: string]: any } = {
    text: TextField,
    textarea: TextArea
};

export type schemaField = {
    name: string;
    label: string;
    type: string;
    value?: any;
    required?: boolean;
    onChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    /**
     * options like placeholder,
     */
    options?: { [key: string]: any };
};
export type schemaForm = Array<schemaField>;

type initialValuesType = { [key: string]: any };

export type CFormProps = {
    schema: schemaForm;
    onSubmit: (...args: any[]) => void;
    onCancel?: (...args: any[]) => void;
    className?: string;
};

const FormStyled = styled(Form)`
 .buttonsForm{
     display: flex;
     justify-content: flex-end;
     margin-top: 2rem;
 }

 .buttonsForm > * + * {
     margin-left: 1rem;
 }
`

export const CForm = React.memo(({ onSubmit, onCancel, schema, className }: CFormProps) => {
    const initialValues: initialValuesType = React.useMemo(() => {
        return schema.reduce((prev: any, { name, value }: any) => {
            prev[name] = value || "";
            return prev;
        }, {});
    }, [schema]);

    const validationSchema: any = React.useMemo(
        () => validationSchemaGenerator(schema),
        [schema]
    );

    return (
        <Formik
            {...{ initialValues, onSubmit }}
            validationSchema={validationSchema}
        >
            <FormStyled className={className}>
                {schema.map((element: schemaField) => {
                    return (
                        <Field
                            key={element.name}
                            component={
                                types[element.type]
                                    ? types[element.type]
                                    : TextField
                            }
                            {...element}
                        />
                    );
                })}
                <div className="buttonsForm">
                    <ButtonSubmit>
                        Submit
                    </ButtonSubmit>
                    {onCancel && (
                        <Button onClick={onCancel} type="button">
                            Cancel
                        </Button>
                    )}
                </div>
            </FormStyled>
        </Formik>
    );
});
