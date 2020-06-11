import React, {useState} from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './Navbar.css'


const { SubMenu } = Menu;

const Navbar = () => {
  const [ current, changeSelected ] = useState('mail')

  const handleClick = e => {
    console.log('click ', e);
    changeSelected(e.key)
  };

    return (
      <section className='headerContainer'>
        <div className='logo'>
          <img alt='coop' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.recoveryisbeautiful.org%2Fwp-content%2Fuploads%2F2015%2F10%2FRecovery-is-Beautiful-Full_CMYK.png&f=1&nofb=1' />
        </div>
      <Menu className='mainNavContainer' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Patient View
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          Caseload
        </Menu.Item>
        <Menu.Item key="alipay">
          TheHub
        </Menu.Item>
      </Menu>
      </section>
    );
}

export default Navbar;