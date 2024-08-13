import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useUseFetch() {
    const[Fetch, setFetch]= useState([])
    const fetchdata = async () => {
        try{
          const data =  await axios.get("https://jsonplaceholder.typicode.com/users")
            console.log(data)
            setFetch(data.data)
        } catch (err){
          console.log("data is fetched", err)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])

  return (
    [Fetch]
  )
}

export default useUseFetch;
