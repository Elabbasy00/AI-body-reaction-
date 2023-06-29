import { Box, Button, Modal, ModalClose, Sheet } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

import { toast } from "react-toastify";

function RecordVideo({ data, sendRecordedData }) {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const interval = useRef(null);
  const videoRef = useRef(null);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    interval.current = setTimeout(handleStopCaptureClick, 30000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    clearTimeout(interval);
  }, [mediaRecorderRef, setCapturing]);

  const handleSubmit = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const formData = new FormData();
      formData.append("compare", blob);
      formData.append("uploaded_id", data?.id);
      sendRecordedData(formData)
        .unwrap()
        .then((e) => {
          toast.success("Video started proccess");
        })
        .catch((e) => toast.error(e.message));
      setRecordedChunks([]);
    }
  }, [recordedChunks, data?.id, sendRecordedData]);

  const video = {
    width: 800,
    // height: 600,
  };

  useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setOpen(true);
      const url = URL.createObjectURL(blob);
      videoRef.current.src = url;
      videoRef.current.load();
    }
    return () => clearTimeout(interval);
  }, [recordedChunks]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={video}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Box sx={{ mt: 2 }}>
        {capturing ? (
          <Button disabled={!data?.id} onClick={handleStopCaptureClick}>
            Stop Capture
          </Button>
        ) : (
          <Button disabled={!data?.id} onClick={handleStartCaptureClick}>
            Start Capture
          </Button>
        )}

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          keepMounted
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(-1/4 * var(--IconButton-size))",
                right: "calc(-1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
                bgcolor: "background.body",
              }}
            />

            <video style={{ width: "100%" }} controls ref={videoRef}></video>
            <Button onClick={handleSubmit} sx={{ mt: 2 }} fullWidth>
              Send
            </Button>
          </Sheet>
        </Modal>
      </Box>
    </>
  );
}

export default RecordVideo;
