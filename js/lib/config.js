module.exports = {
    PARSE: {
        APP_ID: '',
        REST_API_KEY: '',
        SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY'
    },
    backend: {
        parse: false,
        hapiRemote: true,
        hapiLocal: false
    },
    HAPI: {
        local: {
            url: 'http://127.0.0.1:5000'
        },
        remote: {
            url: 'https://mysnowflake-targets.rhcloud.com'
        }
    },
    zoomeye: {
        base_url:'http://api.zoomeye.org',
        SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
        USER_NAME_PASS_KEY:'LOGIN_USER'
        
    }
}
