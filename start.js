require('dotenv').config({ path: `./.env` })

const app = require('./src/app')

const PORT = 4554

async function start(){
    app.listen(PORT, function () {
        console.log(`App listening on port ${PORT}!`)
    })
}
start()
