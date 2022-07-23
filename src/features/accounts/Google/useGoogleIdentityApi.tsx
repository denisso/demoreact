/**
 * Google credentials
 * https://developers.google.com/identity/gsi/web/reference/js-reference#credential
 * needed
 * sub - The unique ID of the user's Google Account
 * email - The user's email address
 * name
 * picture - url image
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import { parseJwt } from "tools/parseJWT";
import { useDispatch } from "react-redux";
import { signIn, CredentialsType, postUserCredentials } from "../reducer";
import { loadScript } from "tools/loadScript";
import { GSI_key } from "settings-demo-project";
export enum GoogleLoadingStates {
    NotLoaded = 0,
    ScriptLoaded,
    GoogleApiInitialized,
}

export const useGoogleIdentityApi = () => {
    const [stateGoogle, setStateGoogle] = React.useState(
        GoogleLoadingStates.NotLoaded
    );
    const dispatch = useDispatch();
    const handleCredentialResponse = React.useCallback(
        (response) => {
            const credentialGoogle: any = parseJwt(response.credential);
            const credentials: CredentialsType = {
                id: credentialGoogle.sub,
                name: credentialGoogle.name,
                email: credentialGoogle.email,
                picture: credentialGoogle.picture,
            };
            dispatch(signIn(credentials));
            dispatch(postUserCredentials(credentials));
        },
        [dispatch]
    );

    React.useEffect(() => {
        switch (stateGoogle) {
            case GoogleLoadingStates.NotLoaded:
                loadScript({
                    src: "https://accounts.google.com/gsi/client",
                    async: true,
                    defer: true,
                    id: "google-script-identity",
                    onload: function () {
                        setStateGoogle(GoogleLoadingStates.ScriptLoaded);
                    },
                });
                break;
            case GoogleLoadingStates.ScriptLoaded:
                if (!window.google) return;

                window.google.accounts.id.initialize({
                    client_id: GSI_key,
                    auto_select: true,
                    callback: handleCredentialResponse,
                });

                setTimeout(() => {
                    if (window.google)
                        setStateGoogle(
                            GoogleLoadingStates.GoogleApiInitialized
                        );
                }, 200);
                break;
        }
    }, [stateGoogle, handleCredentialResponse]);

    return stateGoogle;
};
