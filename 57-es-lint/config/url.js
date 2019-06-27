import env from './env'

const DEV_URL = '//dangan.fanghuwang.com'
const PRO_URL = '//dangan.fanghuwang.com'

export default env === 'development' ? DEV_URL : PRO_URL
