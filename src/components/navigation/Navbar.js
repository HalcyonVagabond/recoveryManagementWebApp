import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import './Navbar.css'


const { SubMenu } = Menu;

const Navbar = () => {
  const [ current, changeSelected ] = useState('mail')
  const history = useHistory();
  const handleClick = e => {
    changeSelected(e.key)
    history.push(`/${e.key}`)
  };

  function loginOrLogout(){
    if(sessionStorage.getItem('token') && !sessionStorage.getItem('adminId')){
      return (
        <Menu className='mainNavContainer' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="logout" onClick={()=>{
          sessionStorage.clear()
          window.location = '/login'
          }}>
          Logout
        </Menu.Item>
        </Menu>
      )
    } else if(sessionStorage.getItem('token') && sessionStorage.getItem('adminId')){
      return (
      <Menu className='mainNavContainer' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="logout" onClick={()=>{
          
          sessionStorage.clear()
          window.location = '/login'
          }}>
          Logout
        </Menu.Item>
        <Menu.Item key="admin" icon={<SettingOutlined />}>
          Admin
        </Menu.Item>
        </Menu>)
    }else {
      return (
        <Menu className='mainNavContainer' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        </Menu>
      )
    }
  }

    return (
      <section className='headerContainer'>
        <a className='logo' target='_blank' href='https://github.com/HalcyonVagabond/recoveryManagementWebApp'>
          <img alt='coop' src={require('../../images/evolvingLogo.png')} />
        </a>  
        {loginOrLogout()}
      </section>
    );
}

export default Navbar;