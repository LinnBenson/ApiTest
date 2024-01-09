import Tool from "befunc";

const Config = {
    port: {
        api: 4000,
        ws: 4001
    },
    debug: true,
    timeout: 0
};

export const Debug = ( text ) => {
    if ( !Config.debug ) { return false; }
    text = text.join( '\n' );
    text = `-- [ ${Tool.getTime()} ] ------------------\n${text}\n`;
    console.log( text );
    return true;
};

export default Config;