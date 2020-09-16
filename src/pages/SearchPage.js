import React, {useState} from 'react';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';

import TopAppBar from '../components/TopAppBar';
import NewsList from '../components/NewsList';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState();

  const searchFromElasticSearch = () => {
    console.log(searchValue)
    const query = {
      "from": 0,
      "size": 50,
      "query": {
        "match": {
          "title.nori": searchValue
        }
      }
    };
    console.log(query);
    
    axios.get("http://localhost:9200/news/_search", {
      params:{
        source: JSON.stringify(query),
        source_content_type: 'application/json',
      },
    }).then((response) => {
      console.log(response);
      const res = response.data.hits.hits;
      setSearchResults(res);
    });

  }
  return (
    <div>
      <TopAppBar />
      <SearchBar
        value={searchValue}
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={() => searchFromElasticSearch()}
      />
      <NewsList news={searchResults}/>
    </div>
  );
}
