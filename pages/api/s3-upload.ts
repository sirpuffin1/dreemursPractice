import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
    async key(req, filename) {
        let userId= req.body.userId;

        return `${userId}/${filename}.mp3`;
    }
})