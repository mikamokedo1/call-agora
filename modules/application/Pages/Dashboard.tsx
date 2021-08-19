import React from 'react';
import AppAnimate from '../../../@gotrust/core/AppAnimate';
import GridContainer from '../../../@gotrust/core/GridContainer';
import { Box, Grid } from '@material-ui/core';
import healthCare from '../../../@gotrust/services/db/dashboard/healthCare';
import DrCard from '../Dashboard/DrCard';
import ProfileCard from '../Dashboard/ProfileCard';

const DashBoard = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box pt={{ xl: 4 }} clone>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <ProfileCard />
          </Grid>
          {healthCare.drState.map((data, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <DrCard data={data} />
            </Grid>
          ))}

          {/* <Grid item xs={12} sm={12} md={6}>
                <HospitalActivity data={healthCare.hospitalActivity} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProfileCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <GridContainer>
                  {healthCare.appointmentCards.map((data, index) => (
                    <Grid item xs={12} key={index}>
                      <AppointmentCard data={data} />
                    </Grid>
                  ))}
                </GridContainer>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <HeartRate data={healthCare.heartCard} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <YourActivity data={healthCare.yourActivity} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <HeartRate data={healthCare.temperatureCard} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <GridContainer>
                  {healthCare.doses.map((data, index) => (
                    <Grid item xs={12} key={index}>
                      <HospitalStatics data={data} />
                    </Grid>
                  ))}
                </GridContainer>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <TopDoctors data={healthCare.topDoctors} />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <UpcomingAppointments data={healthCare.upcomingAppointment} />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Notifications data={healthCare.notifications} />
              </Grid>
              <Grid item xs={12} md={6}>
                <HealthStatics data={healthCare.heathStatics} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <NewPatients data={healthCare.newPatients} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CancelVisits data={healthCare.cancelVisits} />
              </Grid>

              {healthCare.hospitalStatics.map((data, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <HospitalStatics data={data} />
                </Grid>
              ))}
              <Grid item xs={12} sm={12} md={8}>
                <RecentPatients recentPatients={healthCare.recentPatients} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <GridContainer>
                  {healthCare.bloodCard.map((data, index) => (
                    <Grid item xs={12} sm={6} key={'grid-' + index}>
                      <InfoWidget data={data} />
                    </Grid>
                  ))}
                </GridContainer>
              </Grid> */}
        </GridContainer>
      </Box>
    </AppAnimate>
  );
};

export default DashBoard;
