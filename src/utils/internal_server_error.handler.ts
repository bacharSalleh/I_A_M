import { SERVER_INTERNAL_ERROR } from "@Messages";

export default  (requestHandler) => {
  return async (req, res) => {
    try {
      await requestHandler(req, res);
    } catch (error) {
      console.error("[ERROR]: ", error);
      return res.status(500).send({ error: SERVER_INTERNAL_ERROR });
    }
  }
};
