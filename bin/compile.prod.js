const getCompiler = require('./compile')

const compiler = getCompiler()
compiler.run((err, stats) => {
    if (err) {
        console.error(err)
    }

    const jsonStats = stats.toJson()

    if (jsonStats.errors.length > 0) {
        console.error(new Error('Webpack compiler encountered errors'))
    }
})
