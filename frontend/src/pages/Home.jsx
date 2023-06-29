import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import RecordVideo from "../component/record_video/RecordVideo";
import {
  useSendUploadVideoMutation,
  useSendRecordedVideoMutation,
} from "../redux/videoSlice/videoSlice";
import { toast } from "react-toastify";
function Home() {
  const [sendUploadedVideo, { data, isLoading: isUploadingLoading }] =
    useSendUploadVideoMutation();
  const [
    sendRecordedData,
    { data: videosData, isLoading: isRecordingLoading },
  ] = useSendRecordedVideoMutation();

  const videoRef = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    if (formElements.video.files.length > 0) {
      const formData = new FormData();
      formData.append("uploaded_video", formElements.video.files[0]);
      sendUploadedVideo(formData)
        .unwrap()
        .then((e) => {
          toast.success("Now Record You Video..");
        })
        .catch((e) => toast.error(e.message));
    }
  };

  useEffect(() => {
    videoRef.current.src = data?.uploaded_video;
    videoRef.current.load();
  }, [data?.uploaded_video]);

  useEffect(() => {
    if (videosData?.compared_video) {
      videoRef.current.src = videosData.compared_video;
      videoRef.current.load();
    }
  }, [videosData?.compared_video]);

  return (
    <div>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid xs={12}>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography level="h2" sx={{ mb: 2 }}>
              Choose a video to imitate
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
              <Input name="video" sx={{ mb: 2 }} type="file" accept="video/*" />
              <Button fullWidth type="submit">
                Submit
              </Button>
            </Box>
          </Sheet>
        </Grid>

        <Grid lg={6} xs={12}>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography level="h2">Uploaded Video</Typography>
            {isUploadingLoading && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "600px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CircularProgress />
                <Typography> Please Don't Refresh The Page</Typography>
              </Box>
            )}
            <video
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "600px",
                margin: "auto",
              }}
              controls
              ref={videoRef}
            />
          </Sheet>
        </Grid>
        <Grid lg={6} xs={12}>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography level="h2" sx={{ mb: 2 }}>
              Record Yours
            </Typography>
            {isRecordingLoading && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "600px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CircularProgress />
                <Typography> Please Don't Refresh The Page</Typography>
              </Box>
            )}
            <RecordVideo sendRecordedData={sendRecordedData} data={data} />
          </Sheet>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
