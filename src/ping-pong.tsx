/**
 * Keep Alive imitation
 * Chrome removes idle service worker after 30-40 seconds https://github.com/mswjs/msw/issues/367
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { fetchWrapper } from "tools/fetchWrapper";

const pingpong = () => setInterval(() => fetchWrapper("/api/keepalive"), 30000);

export default pingpong;
