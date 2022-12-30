import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import PostBox from '../components/PostBox'
import Feed from '../components/Feed'
import Post from '../components/Post'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Home: NextPage = () => {
  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>Reddit 2.0</title>
      </Head>
      <PostBox />
      <div className='flex'>
        <Feed />
      </div>

    </div>
  )
}

export default Home
