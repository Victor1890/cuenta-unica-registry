import { NextApiRequest, NextApiResponse } from 'next/types';
import { pwnedPassword } from 'hibp';
import { Crypto } from '@/helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number | void>
): Promise<void> {
  const { token } = req.cookies;

  if (token !== process.env.NEXT_PUBLIC_COOKIE_KEY) {
    return res.status(401).send();
  }

  const { password } = req.query;

  if (typeof password !== 'undefined') {
    const passwordKey = Array.isArray(password) ? password[0] : password;
    const data = await pwnedPassword(Crypto.decrypt(passwordKey));
    res.status(200).json(data);
  } else {
    res.status(400);
  }
}