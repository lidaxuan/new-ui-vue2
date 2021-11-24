import utils from "@/utils";

const vueFiles = require.context('./src', true, /\.js$/);
export  default  utils.readFile(vueFiles)
