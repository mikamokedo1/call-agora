import React from 'react';
import List from '@material-ui/core/List';

import { userSelector } from 'src/redux/reducers/Auth';
import { useSelector } from 'react-redux';
import routesConfig, { NavItemProps } from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const user = useSelector(userSelector);
  return (
    <List>
      {routesConfig.map((item: NavItemProps) => {
        const isPermision = (user?.role ?? []).includes(item.role);
        return (
          <React.Fragment key={item.id}>
            {isPermision && item.type === 'group' && <VerticalNavGroup item={item} level={0} />}

            {isPermision && item.type === 'collapse' && <VerticalCollapse item={item} level={0} />}

            {isPermision && item.type === 'item' && <VerticalItem item={item} level={0} />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Navigation;
