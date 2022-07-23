import React from "react"
import { FormField } from "../FormField";
import styled from "styled-components"

const IputStyled = styled.input`
   padding: .3rem;
   font-size: 1.1rem;
   &.rounded {
	border: ${({ theme }) => theme.ui.input.border};
	border-radius: var(--borderRadiusInput);
	box-shadow: ${({ theme }) => theme.ui.input.boxShadow};
	padding: 4px 7px;
	outline: 0;
	-webkit-appearance: none;
}
&.rounded:focus {
	border-color: ${({ theme }) => theme.colors.first};
}
`

export const TextField = React.memo(({
    label,
    field: { name, value, ...fieldProps },
    form,
    required,
    options,
    ...props
}: any) => {
    return (
        <FormField {...{ name, label, required, form }}>
            <IputStyled
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
