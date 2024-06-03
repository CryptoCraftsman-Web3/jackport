import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import dynamic from 'next/dynamic'
 
const Waiting = dynamic(() => import('./test2'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>DegenPot</title>
        <meta name="description" content="DegenPot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Waiting/>
    </>
  );
}
