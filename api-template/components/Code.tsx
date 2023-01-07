import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

import React, { useState } from "react";
import { useRef } from "react";
import { usePagesStateValue } from "../lib/builder";

interface ICode {
  state?: any;
  size?: string;
  setState?: any;
}

export default function Code({ state, size = "large", setState }: ICode) {
  const editor = useRef();

  const pages = usePagesStateValue("pages") ?? [];
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;

  const page = pages[pageIndex];
  const [code, setCode] = useState(() =>
    state ? JSON.stringify(state, null, "\t") : JSON.stringify(page, null, "\t")
  );

  const { handleChange: updatePage } = useActions();
  const handleChange = (value) => setCode(value);

  React.useEffect(() => {
    if (!state) updatePage(code);
    if (state && setState) {
      try {
        setState(JSON.parse(code));
      } catch (e) {}
    }
  }, [code, state]);

  return (
    <>
      <AceEditor
        ref={editor}
        mode={"json"}
        theme={"solarized_dark"}
        placeholder={`Write code here...`}
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableEmmet: false,
          showGutter: false,
        }}
        value={code}
        height={size === "small" ? "35vh" : "70vh"}
        width={"100%"}
        showGutter
        fontSize={11}
      />
    </>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const pages = usePagesStateValue("pages");

  return {
    handleChange(codeString) {
      const type = "update_all";
      let allPages = [...pages];
      try {
        allPages[pageIndex] = JSON.parse(codeString);
      } catch (e) {}
      dispatch({
        type: type,
        payload: allPages,
        key: "pages",
      });
    },
  };
}
