export const SOCKET_CONFIG = {
    HOST: 'localhost',
    PORT: 7013,
    TOPIC : '/filter/search',
    ENDPOINT_SEND: '/app/send/message',
    PATH: '/bolsacarga/socket'
};

export const SOCKET_URL_DEV = {
    URL: 'https://myteseo.dev.logesta.com/bolsacarga/socket'
};
export const SOCKET_URL_LOCAL = {
    URL: 'http://' + SOCKET_CONFIG.HOST + ':' + SOCKET_CONFIG.PORT + SOCKET_CONFIG.PATH
};
