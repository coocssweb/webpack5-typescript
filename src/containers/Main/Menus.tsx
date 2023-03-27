import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'Navigation01',
    icon: <MailOutlined />,
    children: [
      {
        label: 'Sub One',
        key: 'sub1',
      },
      {
        label: 'Sub Two',
        key: 'sub2',
      },
    ],
  } as MenuItem,

  { type: 'divider' },

  {
    label: 'Group',
    key: 'grp',
  } as MenuItem,
];

const Menus: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 250 }}
      defaultSelectedKeys={['sub1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      theme="dark"
    />
  );
};

export default Menus;
