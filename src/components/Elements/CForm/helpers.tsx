/**
 * @description Image without Lazy Loading
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { schemaForm, schemaField } from ".";
import * as Yup from "yup";

export const validationSchemaGenerator = (schema: schemaForm) => {
    const obj: any = schema.reduce(
        (prev: any, { name, type, required }: schemaField) => {
            switch (type) {
                case "text":
                    prev[name] = Yup.string().max(
                        15,
                        "Must be 15 characters or less"
                    );
                    break;
                case "email":
                    prev[name] = Yup.string().email("Invalid email address");
                    break;
                default:
                    prev[name] = Yup.string()
            }
            if (required) {
                prev[name] = prev[name].required("Required");
            }

            return prev;
        },
        {}
    );
    return Yup.object(obj);
};
