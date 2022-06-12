import { useEffect, useRef, useState } from "react"
import MonacoEditor from "@monaco-editor/react"

export const Editor: React.FC<{defaultCode: string, change?:(code: string)=>void, height?: string}> = ({defaultCode, change, height}) => {
  const realHeight = height || '672'
  const iframe = useRef(null)
  const [code, setCode] = useState(defaultCode)
  
  useEffect(() => {
    if(iframe && iframe.current) {
      let iframeDoc = iframe.current as HTMLIFrameElement
      iframeDoc.srcdoc = code
    }
  }, [code])

  return (
    <div className="grid grid-flow-col outline outline-1 outline-slate-300 max-w-8xl w-full">
      <MonacoEditor
          height={realHeight}
          defaultLanguage={'html'}
          defaultValue={code}
          loading=""
          options={{minimap: {enabled: false}}}
          onChange={(newValue) => {
            if(change) change(newValue || "")
            setCode(newValue || "")
          }}
        />
      <div>
        <iframe ref={iframe} id="program" width="672" height={realHeight} />
      </div>
    </div>
  )
}