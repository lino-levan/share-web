import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { useEffect, useRef, useState } from 'react'

import { IProgram } from '../../lib/types'
import { Header } from '../../components/Header';
import { Editor } from '../../components/Editor';

const Home: NextPage<{program?: IProgram}> = (props) => {
  const program = props.program
  
  const [upvoted, setUpvoted] = useState(false)

  if(!program) return <div>Error</div>

  return (
    <div>
      <Head>
        <title>Share Web</title>
        <meta name="description" content="The ultimate program viewer for khanacademy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="p-10 text-slate-500 flex flex-col gap-10">
          <h1 className="text-4xl text-center text-slate-800">{program.title}</h1>
          <Editor defaultCode={program.code}/>
          
          <div className="flex justify-center gap-10">
            {
              !upvoted?
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={()=>{
                setUpvoted(true)
                fetch(`/api/program/upvote/${program.id}`)
              }}>{program.upvotes} Votes</button>
              :
              <p className="bg-blue-600 text-white px-4 py-2 rounded">Upvoted!</p>
            }
           
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id

  if(!id) return { props: {} }

  const program = await fetch(process.env.NEXTAUTH_URL+`/api/program/${id}`).then(res => res.json())

  return {
    props: {
      program
    },
  }
}