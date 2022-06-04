import styled from "styled-components";

const FormFieldStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    .error {
        color: ${({ theme }) => theme.colorError};
    }
    & > label {
        margin-bottom: 0.5rem;
    }
`;

export const FormField = ({
    name,
    label,
    required,
    form: { touched, errors },
    children,
}: any) => {
    const hasError = errors[name] && touched[name];

    return (
        <FormFieldStyled>
            <label htmlFor={name}>
                {label}
                {required && <sup className="required">*</sup>}
                {hasError && <small className="error">{errors[name]}</small>}
            </label>
            {children}
        </FormFieldStyled>
    );
};
