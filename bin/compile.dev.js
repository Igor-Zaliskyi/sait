const WebpackDevServer = require('webpack-dev-server')
const getCompiler = require('./compile')
const project = require('../config/project.config')
const compiler = getCompiler()
const server = new WebpackDevServer(compiler)

server.listen(project.port)
