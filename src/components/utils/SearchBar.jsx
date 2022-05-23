import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Input, Button, Card } from "antd"
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

const SearchBar = ({ placeholder, data }) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }

  const searchLink = (id) => {
    navigate(`/dogs/${id}`)
    clearInput()
  }
  
  return (
    <div className="search">
      <div className="searchInputs">
          <Input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
        <div className="searchIcon">
          {wordEntered.length === 0 ? < SearchOutlined/>:
          <Button onClick={clearInput}>
            <CloseOutlined id="clearBtn"/>
          </Button>
          }
        </div>
      </div>
      {filteredData?.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 3).map((value, key)=> {
            return(
                <Card className="ResultCard" hoverable key={value.id}
                onClick={()=>searchLink(value.id)}>
                 <p>{value.name}</p>
                </Card>
              )})}
        </div>
      )}
    </div>
  )
}

export default SearchBar