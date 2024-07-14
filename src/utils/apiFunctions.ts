import axios from "axios";
import { log } from "console";

const getDataApi = async (
  url: string,
  successMessage: string,
  failureMessage: string,
  placeName: string,
  toast: any
) => {
  try {
    const { data } = await axios.get(url);
    toast({ variant: "default", title: successMessage || "Successfull!" });
    return data;
  } catch (error: any) {
    console.log(error?.message);
    console.log("something went wrong while making query for " + placeName);
    toast({
      variant: "default",
      title: failureMessage || "Oops Something went wrong!",
      description: "plzz try later!",
    });
  }
};
const sendDataApi = async ({
  url,
  postData,
  successMessage,
  failureMessage,
  placeName,
  toast,
}: {
  url?: string;
  postData?: any;
  successMessage?: string;
  failureMessage?: string;
  placeName?: string;
  toast?: any;
}) => {
  try {
    const { data } = await axios.post(url as string, postData);
    toast({ variant: "default", title: successMessage || "Successfull!" });
    return data;
  } catch (error: any) {
    console.log(error?.message);
    console.log("something went wrong while making query for " + placeName);
    toast({
      variant: "default",
      title: failureMessage || "Oops Something went wrong!",
      description: "plzz try later!",
    });
  }
};
const deleteDataApi = async (
  url: string,
  successMessage: string,
  failureMessage: string,
  placeName: string,
  toast: any
) => {
  try {
    const { data } = await axios.delete(url);
    toast({ variant: "default", title: successMessage || "Successfull!" });
    return data;
  } catch (error: any) {
    console.log(error?.message);
    console.log("something went wrong while making query for " + placeName);
    toast({
      variant: "default",
      title: failureMessage || "Oops Something went wrong!",
      description: "plzz try later!",
    });
  }
};

const updateDataApi = async (
  url: string,
  postData: any,
  successMessage: string,
  failureMessage: string,
  placeName: string,
  toast: any
) => {
  try {
    const { data } = await axios.put(url, postData);
    toast({ variant: "default", title: successMessage || "Successfull!" });
    return data;
  } catch (error: any) {
    console.log(error?.message);
    console.log("something went wrong while making query for " + placeName);
    toast({
      variant: "default",
      title: failureMessage || "Oops Something went wrong!",
      description: "plzz try later!",
    });
  }
};

export { getDataApi, sendDataApi, updateDataApi, deleteDataApi };
