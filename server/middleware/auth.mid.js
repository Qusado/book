const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]

        if (!token){
            return res.status(401).json({
                message: "Нет токена"
            })
        }
        console.log("bfgb",token);
        const decoded = jwt.verify(token, 'lox')
        req.user = decoded
        next()
    }catch (e){
        return res.status(401).json({
            message: "Неверный токен"
        })

    }}
