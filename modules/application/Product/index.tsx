import React from 'react';
import Grid from '@material-ui/core/Grid';
// import ComponentHeader from '../../../@gotrust/core/ComponentHeader';
import GridContainer from '../../../@gotrust/core/GridContainer';
import Editable from './EditTable';

const ReactTable = () => {
  return (
    <>
      <GridContainer>
        <Grid item xs={12}>
          <Editable />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
