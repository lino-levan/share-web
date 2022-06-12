import type { NextPage } from 'next'
import Head from 'next/head'
import { Editor } from '../components/Editor';
import { Header } from '../components/Header';

const Docs: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Share Web</title>
        <meta name="description" content="Share your little projects with the world!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="p-10 text-slate-800 flex flex-col gap-10">
          <h1 className="text-4xl">Documentation</h1>
          <p>This is just some simple HTML documentation for people just getting started. There are plenty of editable demos if you want a jumping off point.</p>
          <p>Here is the default skeleton used when you create a new program. It&apos;s just html!</p>
          <Editor height="400" defaultCode={"<!DOCTYPE html>\n<html>\n  <head>\n    <title>New Program</title>\n  </head>\n <body>\n    <h1>New Program</h1>\n  </body>\n</html>"}/>
          <p>Javascript is fully enabled... have fun!</p>
          <Editor height="400" defaultCode={"<!DOCTYPE html>\n<html>\n  <head>\n    <title>New Program</title>\n  </head>\n <body>\n    <button id=\"button\">Hi, how are you doing?</button>\n    <script>\n      document.getElementById(\"button\").onclick = () => alert(\"Hello! I am doing great!\")\n    </script>\n  </body>\n</html>"}/>
        </div>
      </main>
    </div>
  )
}

export default Docs
