
/**
 * Middleware for the endpoint which should return one entity
 * (get entity by ID, update, create)
 *
 * @param req
 * @param res
 * @param next
 */
const one = (req, res, next) => {
    res.EMPTY_DATA = null
    res.sendData = json => res.send(json)
    next()
}

/**
 * Middleware for the endpoint which should return many entities
 */
const many = (req, res, next) => {
    res.EMPTY_DATA = []
    res.sendData = json => res.send(json)
    next()
}

module.exports.one = one
module.exports.many = many
