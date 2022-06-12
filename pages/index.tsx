import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Header } from '../components/Header';
import { IProgram } from '../lib/types';

const Index: NextPage<{programs: IProgram[]}> = ({programs}) => {
  return (
    <div>
      <Head>
        <title>Share Web</title>
        <meta name="description" content="Share your little projects with the world!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="flex flex-wrap p-10 gap-10">
          {
            programs?.map(program => (
              <div key={program.id} className="w-52">
                <Link href={`/program/${program.id}`} target="_blank" rel="noreferrer">
                  <div>
                    <div className="flex justify-center items-center outline outline-1 outline-slate-300 w-52 h-52">
                      <Image src={program.image} alt={program.title} width={208} height={208} />
                    </div>
                    <p className="w-52 h-7 text-xl text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap underline-offset-4 cursor-pointer hover:underline">{program.title}</p>
                  </div>
                </Link>
                {/* <Link href={`/profile/${scratchpad.authorKaid}`}><p className="w-52 h-6 text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap underline-offset-4 cursor-pointer hover:underline">{scratchpad.authorNickname}</p></Link> */}
                <p className="w-52 h-6 overflow-hidden text-ellipsis whitespace-nowrap">{program.upvotes} Votes</p>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const programs = await fetch(process.env.NEXTAUTH_URL+`/api/program/new`).then(res => res.json())

  return {
    props: {
      programs
    },
  }
}

