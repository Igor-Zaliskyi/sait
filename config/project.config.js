const path = require('path')

// ========================================================
// Default Configuration
// ========================================================
const config = {
    port: '8080',
    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base:  path.resolve(__dirname, '..'),
    dir_client: 'src',
    dir_dist:   'dist',
    dir_public: 'public'
}

/************************************************
 -------------------------------------------------

 All Internal Configuration Below
 Edit at Your Own Risk

 -------------------------------------------------
 ************************************************/

config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV':    config.env,
    '__DEV__':     config.env === 'development',
    '__PROD__':    config.env === 'production'
}

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
    const args = [config.path_base].concat([].slice.call(arguments))
    return path.resolve.apply(path, args)
}

config.paths = {
    base:   base,
    client: base.bind(null, config.dir_client),
    public: base.bind(null, path.resolve(config.dir_client, config.dir_public)),
    dist:   base.bind(null, config.dir_dist)
}

module.exports = config
