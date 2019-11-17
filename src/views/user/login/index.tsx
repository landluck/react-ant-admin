import React from 'react'
import { Tabs, Checkbox, Button, Icon, Form, message } from 'antd'
import './index.less'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { FormComponentProps } from 'antd/es/form';
import renderAccount from './componets/account'
import renderMobile from './componets/mobile'
import VerifyUtils from '../../../utils/verifty';
import { apiUserLogin } from './service'
import { connect } from 'react-redux'
import { setUserInfo, UserState } from '../../../store/module/user'

const COUNT_STATIC = 60


interface LoginProps extends FormComponentProps, RouteComponentProps {

  setUserInfo: (userInfo: UserState) => void
}

interface LoginState {
  activeTab: string
  count: number
  mobile: string
}

interface FormProp {

  account?: string
  mobile?: string
  password?: string
  code?: number
}


class Login extends React.Component<LoginProps, LoginState> {


  // static contextType = 

  timer: NodeJS.Timeout | null = null

  state: LoginState = {
    activeTab: 'account',
    count: COUNT_STATIC,
    mobile: ''
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  onTimeClick = () => {

    const value = this.props.form.getFieldValue('mobile')

    if(!VerifyUtils.verifyMobile(value)) {
      message.error('请输入合法手机号')
      return
    }

    // 发起请求

    this.countdown()

  }

  countdown () {

    if (this.state.count === 0) {

      this.setState({
        count: COUNT_STATIC
      })

      
      this.clearTimer()
      return
    }

    this.setState((prev) => ({
      count: prev.count - 1
    }))

    this.timer = setTimeout(() => {

      this.countdown()
    }, 1000)
  }


  clearTimer () {
    if (this.timer) {

      clearTimeout(this.timer)

      this.timer = null
    }
  }

  setActiveTab = (activeTab: string) => {

    this.setState({
      activeTab
    })

    if (activeTab === 'account') {
      this.clearTimer()

      this.setState({
        count: COUNT_STATIC
      })

    }
  }


  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    this.props.form.validateFields((err, values: FormProp) => {

      if (!err) {

        if (values.account && values.password) {

           apiUserLogin(
             { 
               account: values.account,
               password: values.password
              }
            ).then(({ data }) => {

              this.props.setUserInfo(data)
              
              this.props.history.push('/')

            }).catch(() => {})

          return
        }

        if (values.mobile && values.code) {

        }
      }
    });
  }


  onChange = () => {

  }


  render () {

    const { activeTab, count } = this.state

    const { getFieldDecorator } = this.props.form

    return (
      <div className='login-wrap'>
        <Tabs defaultActiveKey={activeTab} onChange={this.setActiveTab}>
          <Tabs.TabPane tab="账号密码登录" key='account'></Tabs.TabPane>
          <Tabs.TabPane tab="手机号登录" key='mobile' ></Tabs.TabPane>
        </Tabs>
  
        <Form onSubmit={this.onSubmit}>
          {
            activeTab === 'account' ?

            renderAccount(getFieldDecorator) :

            renderMobile(getFieldDecorator, count, this.onTimeClick)
          }
  
          <Form.Item>
            <div className='more-opt'>
              <Checkbox checked onChange={this.onChange}>自动登录</Checkbox>
              <Link to='/system-user/recovery-pwd'>忘记密码</Link>
            </div>
          </Form.Item>
  
          <Form.Item>
            <Button block htmlType="submit"  type="primary">登录</Button>
          </Form.Item>
  
          <Form.Item>
            <div className='more-opt'>
              <div className='other-login'>
                其他登录方式
                <Icon className='login-icon' type="github"></Icon>
                <Icon className='login-icon' type="zhihu"></Icon>
              </div>
              <Link to='/system-user/register'>注册账号</Link>
            </div>
          </Form.Item>
  
        </Form>
      </div>
    )
  }
}

export default connect(
  () => ({}), 
  {
    setUserInfo
  }
)(Form.create({ name: 'login'})(withRouter(Login)))