import { NextApiRequest, NextApiResponse } from "next";
import { resolveHref } from "next/dist/next-server/lib/router/router";

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log('evento recebido')

    res.status(200).json({ ok: true })
}