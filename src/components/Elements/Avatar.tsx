/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";
import { Image } from "./Image";

// Avatar without prop picture get picture from user credentials
const AvatarByUser = (props: any) => {
    const { credentials } = useSelector(selectSignInState);
    return <Image src={credentials.picture} {...props} />;
};

export const Avatar = React.memo(({ src, ...props }: any) => {
    if (typeof src === "string") return <Image src={src} {...props} />;
    return <AvatarByUser {...props} />;
});
