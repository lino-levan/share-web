import type { NextPage } from 'next'
import Head from 'next/head'

import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react'
import { Header } from '../../components/Header';
import { Editor } from '../../components/Editor';

const defaultProgram = `<!DOCTYPE html>
<html>
  <head>
    <title>New Program</title>
  </head>
  <body>
    <h1>New Program</h1>
  </body>
</html>`

const New: NextPage = (props) => {
  const [code, setCode] = useState("")
  const [title, setTitle] = useState("")

  useEffect(()=>{
    // console.log(localStorage.getItem("program") || defaultProgram)
    setCode(localStorage.getItem("program") || defaultProgram)
    setTitle(localStorage.getItem("title") || "New Program")
  }, [code])

  return (
    <div>
      <Head>
        <title>Share Web</title>
        <meta name="description" content="The ultimate program viewer for khanacademy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="p-10 text-slate-500 flex flex-col items-center gap-10">
          <div className="flex justify-center gap-10">
            <input className="text-4xl max-w-6xl p-2 text-center text-slate-800 rounded outline outline-1 outline-slate-300" value={title} onChange={(e)=>{
              if(e.target.value) {
                localStorage.setItem("title", e.target.value)
                setTitle(e.target.value)
              }
            }}></input>
            <button className="bg-blue-600 text-xl text-white px-4 py-2 rounded flex items-center" onClick={(e)=>{
              // localStorage.clear()

              // save html as image
              html2canvas(document.getElementById("program")!, {width: 100, height: 100, windowWidth: 400, windowHeight: 400, scale: 1, allowTaint: true}).then(canvas => {
                const image = canvas.toDataURL("image/png")

                fetch('/api/program/publish', {
                  method: 'POST',
                  body: JSON.stringify({
                    title,
                    code,
                    image
                  })
                }).then((res)=>res.json()).then((res)=> {
                  window.location.href = "/program/" + res.id
                })
              })

            }}>Publish</button>
          </div>
          {
          /* Fix weird bug where editor was not re-rendering. */
          code.length>0
          ?
          <Editor defaultCode={code} height="500" change={(c)=>{
            setCode(c)
            localStorage.setItem("program", c)
          }}/>
          :
          null
          }
        </div>
      </main>
    </div>
  )
}

export default New