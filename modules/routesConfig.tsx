export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  as?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        messageId: 'sidebar.application.dashboard',
        type: 'item',
        url: '/application/dashboard',
        icon: 'dashboard'
      },
      {
        id: 'search',
        title: 'Search',
        messageId: 'sidebar.application.search',
        type: 'item',
        url: '/application/search',
        icon: 'search'
      },
      {
        id: 'request',
        title: 'Request',
        messageId: 'sidebar.application.request',
        type: 'item',
        url: '/application/request',
        icon: 'attach_file'
      },
      {
        id: 'customer',
        title: 'Customer',
        messageId: 'sidebar.application.customer',
        type: 'item',
        url: '/application/customer',
        icon: 'account_box'
      },
      {
        id: 'product',
        title: 'Product',
        messageId: 'sidebar.application.product',
        type: 'item',
        url: '/application/product',
        icon: 'shopping_cart'
      },
      {
        id: 'message',
        title: 'Message',
        messageId: 'sidebar.application.message',
        type: 'item',
        url: '/application/message',
        icon: 'message'
      },
    ]
  },
];
export default routesConfig;
