import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import HeartRateChart from './components/HeartRateChart';
import GpsMap from './components/GpsMap';

const App = () => {
  const [BPM, setBpm] = useState(null);
  const [body, setBody] = useState(null);
  const [air, setAir] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [message, setMessage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // WebSocket 연결 및 메시지 처리
  useEffect(() => {
    const ws = new WebSocket("ws://34.69.7.102:8081/ws/notifications");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
          try {
            // JSON 파싱
            const data = JSON.parse(event.data);
            const newNotification = {
                  message: data.message || null,
                  phone: data.phone || null,
            };
            if (newNotification.message || newNotification.phone) {
                  setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
                  console.log("Received and added notification:", newNotification);
            }
            // 상태 업데이트
            setBpm(data.bpm);
            setBody(data.body);
            setAir(data.air);
            setLat(data.lan);
            setLon(data.lon);

            console.log("Received and parsed data:", data);
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
    };

    ws.onclose = (event) => {
      console.error("WebSocket connection closed:", event.code, event.reason);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
        padding: '20px',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#fff' }}
      >
        헬스워치 대시보드
      </Typography>

      <Grid container spacing={3}>
              {/* 왼쪽 GPS */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      GPS 위치
                    </Typography>
                    <GpsMap lat={lat} lon={lon} />
                  </CardContent>
                </Card>
              </Grid>

              {/* 오른쪽 심박수, 공기 온도, 체온 */}
              <Grid item xs={12} md={6}>
                <Card sx={{ marginBottom: "20px", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      심박수
                    </Typography>
                    <Typography variant="h3" color="primary">
                      {BPM} BPM
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ marginBottom: "20px", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      공기 온도
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {air}°C
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ marginBottom: "20px", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      체온 센서
                    </Typography>
                    <Typography variant="h3" color="textSecondary">
                      {body}°C
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
      </Grid>

      <Box sx={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom>
          실시간 알림
        </Typography>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Box key={index} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
              {notification.message && (
                <Typography variant="body1" gutterBottom>
                  {notification.message}
                </Typography>
              )}
              {notification.phone && (
                <Typography variant="body2" color="textSecondary">
                  연락처: {notification.phone}
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            아직 알림이 없습니다.
          </Typography>
        )}
      </Box>



      <Typography align="center" sx={{ marginTop: '20px', color: '#fff' }}>
        © 2024 헬스워치 대시보드 by React
      </Typography>
    </Box>
  );
};

export default App;
