/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { useDispatch } from "react-redux";
import { applyViewportResize } from "../reducer";
var throttle = require("lodash.throttle");

export const useResizeObserver = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        const calculate = throttle(function () {
            dispatch(applyViewportResize());
        }, 200);
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                calculate();
            });

            resizeObserver.observe(document.documentElement);
        }
    }, [dispatch]);
};
