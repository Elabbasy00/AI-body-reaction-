import { api } from "../api";

export const VideoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendUploadVideo: builder.mutation({
      query: (data) => ({
        url: "upload/",
        method: "POST",
        body: data,
      }),
      //   transformResponse: (response) =>
      //     response?.actions?.POST?.country?.choices,
    }),
    SendRecordedVideo: builder.mutation({
      query: (data) => ({
        url: "compare/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendRecordedVideoMutation, useSendUploadVideoMutation } =
  VideoApi;
