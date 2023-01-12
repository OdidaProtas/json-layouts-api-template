import React, { FunctionComponent, useState } from "react";
import useAllan from "./useBot";
import axios from "axios";

interface OwnProps {
}


const AllanWidget: FunctionComponent<OwnProps> = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState([]);


  // const handleSearch = async (searchQuery: string, alan: any) => {
  //     const [res,] = await ref(axios.get(`${searchURL}/${searchQuery}`));
  //     setSearchText(searchQuery);
  //     if (res) {
  //         setSearchItems(res.data)
  //         alan.playText(`I have found ${res.data.length} items matching ${searchQuery}`)
  //     }

  // }

  useAllan();

  return (
    <div>
      {/* <CategoryDialog searchItems={searchItems} searchText={searchText} open={searchOpen} close={setSearchOpen}/> */}
    </div>
  );
};

export default AllanWidget;
