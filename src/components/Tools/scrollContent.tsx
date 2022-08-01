/**
 * @description
 * sandbox: https://codesandbox.io/s/smooth-scroll-vanila-js-i0usik
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
const $doc = document.documentElement;

const animateScrollTo = (scrollTopEnd: number) =>
    new Promise((resolve) => {
        let scrollTopStart: number = $doc.scrollTop;

        let duration: number = Math.abs(scrollTopEnd) * 2;

        if (duration > 400) duration = 400;

        let timeEnd: number = performance.now() + duration;

        requestAnimationFrame(function ani(timeCurrent) {
            let timeDiff = timeEnd - timeCurrent;

            let percent = 1 - timeDiff / duration;

            if (percent > 1) {
                $doc.scrollTop = scrollTopStart + scrollTopEnd;
                return resolve(true);
            }

            $doc.scrollTop = scrollTopStart + scrollTopEnd * percent;
            return requestAnimationFrame(ani);
        });
    });

export const scrollContent = async (
    scrollTo: number | HTMLElement,
    offset: number = -40
) => {
    if (scrollTo instanceof HTMLElement) {
        // for lazy loading image vertical shift 
        for (let attempt = 0; attempt < 5; attempt++) {
            await animateScrollTo(
                scrollTo.getBoundingClientRect().top + offset
            );
            if (Math.abs(scrollTo.getBoundingClientRect().top + offset) < 3) {

                break;
            }
        }
    } else {
        if (typeof scrollTo !== "number") return;
        await animateScrollTo(scrollTo + offset - $doc.scrollTop);
    }
};
