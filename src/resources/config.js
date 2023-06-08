import { encode } from "base-64";

const config = {
    siteURL: 'https://symptomatic-cave.localsite.io/wp-json/wc/v3/',
    wcCredentials: 'consumer_key=ck_9b274f53cecd00ee28d311e020bff1b5f14ec9aa&consumer_secret=cs_432e529c46e4f9dc7e1fd2caa8596814891539c6',
    liveLinkCredentials: `Basic ${encode('racket:passionate')}`
};

export default config;