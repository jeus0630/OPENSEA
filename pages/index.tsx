import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
    </>
  )
}

export default Home
