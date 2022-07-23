/**
 * @description Image without Lazy Loading
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { FormField } from "../FormField";
import styled from "styled-components";

const TextAreaStyled = styled.textarea`
    padding: 0.3rem;
    font-size: 1.1rem;
    resize: vertical;
    &.rounded {
        border: ${({ theme }) => theme.ui.input.border};
        border-radius: var(--borderRadiusInput);
        box-shadow: ${({ theme }) => theme.ui.input.boxShadow};
        padding: 4px 7px;
        outline: 0;
        -webkit-appearance: none;
    }
    min-height: 2rem;
    &.rounded:focus {
        border-color: ${({ theme }) => theme.colors.first};
    }
`;

export const TextArea = React.memo(({
    label,
    field: { name, value, ...fieldProps },
    form,
    required,
    options,
    ...props
}: any) => {
    return (
        <FormField {...{ name, label, required, form }}>
            <TextAreaStyled
                className="rounded"
                type="text"
                id={name}
                name={name}
                value={value}
                {...options}
                {...fieldProps}
                {...props}
            />
        </FormField>
    );
});
