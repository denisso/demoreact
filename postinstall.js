const fs = require("fs");

const path = "./src/settings-demo-project.template.tsx";
const pathexist = "./src/settings-demo-project.tsx";

function postinstall() {
    try {
        if (fs.existsSync(pathexist)) {
            console.log(`file ${pathexist} already exist`);
            return;
        }
        if (fs.existsSync(path)) {
            fs.rename(path, pathexist, function (err) {
                if (err) console.error("ERROR: " + err);
            });
            console.log(`file ${path} renamed to ${pathexist}`);
        }
    } catch (err) {
        console.error(err);
    }
}

postinstall();
