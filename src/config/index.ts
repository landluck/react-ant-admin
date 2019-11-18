
export interface Config {

  SUCCESS_CODE: number

  LOGIN_EXPIRE: number

  API_URL: string

  layout: 'side' | 'top'

  theme: 'dark' | 'light'

  fixedHeader: boolean

  contentWidth: 'fluid' | 'fixed'
}


const AdminConfig: Config = {

  // 请求成功状态码
  SUCCESS_CODE: 200,

  // 登录过期，或者未登录
  LOGIN_EXPIRE: 400,

  // 统一请求地址
  API_URL: '',

  // 默认菜单栏位置
  layout: 'top',

  // 默认主题颜色
  theme: 'light',

  // 是否固定头部
  fixedHeader: false,

  // 固定宽度或者流式宽度
  contentWidth: 'fluid'
}


export default AdminConfig