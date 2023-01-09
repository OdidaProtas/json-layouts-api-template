import ReactMarkdown from "react-markdown";
import useDetail from "../../../hooks/useRow";

export default function Markdown({ text="", api = {} }: any) {
  const [row, loadingRow] = useDetail(api);

  function getText() {
    if (api?.id) {
      if (loadingRow) {
        return "...";
      }
      if (row) {
        const mapState = api?.mapState;
        const rowData = JSON.parse(row?.rowDraft ?? "{}");
        return rowData[mapState?.text];
      }
      return text;
    }
    return text;
  }
  return <ReactMarkdown>{getText()}</ReactMarkdown>;
}
