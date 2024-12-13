import jwt from 'jsonwebtoken'

const auth  = async (req,res,next) =>{
    const SECRET_KEY = process.env.SECRET_KEY
    const header = req.headers.authorization
    if(header)
        {
            const token = header.split(' ')[1]
            jwt.verify(token,SECRET_KEY,(err,user)=>{
                if(err)
                    {
                        return res.status(403)
                    }
                req.user = user   
                next() 
            })
        }
        else
        return res.status(201)
}

export default auth