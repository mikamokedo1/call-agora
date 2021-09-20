export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
  role: string;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.app.dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/partner',
    role: 'user',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.app.dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/manager',
    role: 'manager',
  },
  // {
  //   id: 'ticket',
  //   title: 'yêu cầu hổ trợ',
  //   messageId: 'sidebar.app.ticket',
  //   type: 'item',
  //   icon: 'email',
  //   url: '/ticket',
  //   role: 'user',
  // },
  {
    id: 'users',
    title: 'Cộng tác viên',
    messageId: 'sidebar.app.users',
    type: 'item',
    icon: 'person',
    url: '/users',
    role: 'manager',
  },
  {
    id: 'oders',
    title: 'Danh sách đơn hàng',
    messageId: 'sidebar.app.orders',
    type: 'item',
    icon: 'listAlt',
    url: '/orders',
    role: 'manager',
  },
  {
    id: 'setting',
    title: 'Setting',
    messageId: 'sidebar.app.setting',
    type: 'item',
    icon: 'settings',
    url: '/setting',
    role: 'user',
  },
];
export default routesConfig;
