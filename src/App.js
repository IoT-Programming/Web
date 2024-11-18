import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import HeartRateChart from './components/HeartRateChart';
import GpsMap from './components/GpsMap';

const App = () => {
  // 샘플 데이터
  const sampleHeartRateData = [
    { time: '10:00', heartRate: 72 },
    { time: '10:05', heartRate: 75 },
    { time: '10:10', heartRate: 80 },
    { time: '10:15', heartRate: 85 },
    { time: '10:20', heartRate: 78 },
  ];

  const sampleRoute = [
    [37.5665, 126.9780],
    [37.5655, 126.9775],
    [37.5645, 126.9760],
  ];

  // 센서 데이터 샘플
  const temperatureData = 25; // 온도 (°C)
  const bodyTemperatureData = 36.5; // 체온 (°C)
  const humidityData = 60; // 습도 (%)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)', // 그라데이션 배경
        padding: '20px',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#fff' }}
      >
        헬스워치 대시보드
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* 심박수 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                심박수
              </Typography>
              <HeartRateChart data={sampleHeartRateData} />
            </CardContent>
          </Card>
        </Grid>
        {/* GPS */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                GPS 경로
              </Typography>
              <GpsMap route={sampleRoute} />
            </CardContent>
          </Card>
        </Grid>
        {/* 온도 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                온도 센서
              </Typography>
              <Typography variant="h3" color="primary">
                {temperatureData}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 체온 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                체온 센서
              </Typography>
              <Typography variant="h3" color="secondary">
                {bodyTemperatureData}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 습도 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                습도 센서
              </Typography>
              <Typography variant="h3" color="textSecondary">
                {humidityData}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography align="center" sx={{ marginTop: '20px', color: '#fff' }}>
        © 2024 헬스워치 대시보드 by React
      </Typography>
    </Box>
  );
};

export default App;
