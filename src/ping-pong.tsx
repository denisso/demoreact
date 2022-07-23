/**
 * Keep Alive imitation
 * https://codesandbox.io/examples/package/@mswjs/data
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { fetchWrapper } from "tools/fetchWrapper";

const pingpong = () => setInterval(() => fetchWrapper("/api/keepalive"), 30000);

export default pingpong;
