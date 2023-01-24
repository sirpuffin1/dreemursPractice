import Head from 'next/head'
import Image from 'next/image'
import Landing from '../containers/Landing'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nightly</title>
        <meta name="description" content="Where dreams come true...hopefully" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/nightly-website-favicon-color.png" />
      </Head>
        <Landing/>
    </>
  )
}
