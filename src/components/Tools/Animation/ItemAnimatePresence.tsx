/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react"
import { motion, AnimatePresence } from "framer-motion";

/**
 * Type animation used in ItemAnimatePresence
 */
const animations = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
};
// const animations = {
//     initial: { x: 0, opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: 0, opacity: 0 },
// };
export type Props = {
    children: any;
    isVisible?: boolean;
    /* 
        not implemented yet
        idea: make several types of animations 
        for example animationType = ["fadeInOut", "fromLeft"]
    */
    animationType?: Array<string>; 
    className?: any;
};

export const ItemAnimatePresence = React.memo(({
    children,
    className,
    isVisible = true,
}: Props) => {
    return (
        <AnimatePresence>
            {isVisible === true && (
                <motion.div
                    className={className}
                    variants={animations}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: .4 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
});
