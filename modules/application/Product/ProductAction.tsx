import React, {useContext, useState} from 'react';
import { Box } from '@material-ui/core';
import AppContext from '../../../@gotrust/utility/AppContext';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import {Scrollbar} from '../../../@gotrust/index';
import useStyles from '../../../@gotrust/core/ThemeSetting/index.style';
import {
  LayoutType,
} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../types/AppContextPropsType';

interface ProductActionProps {
  event: any;
  rowData: any;
  props: any;
}

const ProductAction: React.FC<ProductActionProps> = ({
  event,
  rowData,
  props
}) => {
  const [open, setCustomizerStatus] = useState(false);
  const {
    layoutType,
  } = useContext<AppContextPropsType>(AppContext);
  const classes = useStyles(props);
  return <Box className={clsx(classes.customizerOption, 'customizerOption')}>
    <Box className={classes.customizerButton}>
      <IconButton onClick={() => setCustomizerStatus(!open)}>
        <i
          className={clsx(
            classes.textWhite,
            'material-icons animated infinite pulse',
          )}>
          settings
        </i>
      </IconButton>
    </Box>
    <Drawer
      anchor='right'
      className={layoutType === LayoutType.BOXED ? 'boxed-drawer' : ''}
      open={open}
      onClose={() => setCustomizerStatus(false)}>
      <Scrollbar className={classes.rightSidebar}>

      </Scrollbar>
    </Drawer>
  </Box>
}

export default ProductAction;
