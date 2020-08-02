module.exports = async (req, res, next) => {
  console.log('need auth');
  // get token from header an validate it
  // console.log('sails.config.jwt', sails.config.jwt);
  let token = req.headers['authorization'] || '';
  token = token.replace('Bearer ','')

  // validate we have all params
  // if(!token) {
  //   throw badRequest('AUTH_FORBIDDEN')
  // }

  console.log('token', token);
  // validate token and set req.User if we have a valid token
  const payload = await sails.services.tokenauth.verifyToken(token)

  console.log('payload', payload);
  // const tokenAlive = await Redis.getAsync(`user-token:${payload.user.id}:${token}:${hash}`)
  //
  // if(tokenAlive === null){
  //   throw badRequest(AUTH_TOKEN_REVOKED, FORBIDDEN)
  // }
  //
  // if(tokenAlive === AUTH_NEED_REFRESH_TOKEN){
  //   throw badRequest(AUTH_NEED_REFRESH_TOKEN, UNAUTHORIZED)
  // }

  // req.payload = payload
  req.user = payload.user
  req.token = token

  next();

};
