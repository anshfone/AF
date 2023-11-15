import React, { Fragment, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const HomePage: React.FC = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  },[])

  return (
    <Fragment>
      Welcome   
    </Fragment>
  )
}

export default HomePage
