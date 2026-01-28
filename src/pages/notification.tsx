import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import api from "../services/api";

interface Notification {
  id: number;
  title?: string;      // optional (backend may not send title)
  message: string;
  created_at?: string;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("notifications/")
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <NotificationsIcon color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Notifications
        </Typography>
      </Stack>

      {loading ? (
        <Stack alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      ) : notifications.length === 0 ? (
        <Typography>No notifications yet.</Typography>
      ) : (
        notifications.map((note) => (
          <Card key={note.id} sx={{ mb: 3 }}>
            <CardContent>
              {/* If backend doesn’t have title, show a default */}
              <Typography variant="subtitle1" fontWeight={600}>
                {note.title || "Notification"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {note.message}
              </Typography>

              {note.created_at && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={1}
                >
                  {new Date(note.created_at).toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Notifications;
