import React from "react"
import {Card, Spinner} from "flowbite-react"
import axios from "axios"
import useSWR from "swr"
import Link from "next/link"
const GetListPost = () => {
  const fetcher = (url) => axios.get(url).then(res => res?.data)
  const {data, error} = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher)
  if(error){
   return(
    <div className="flex items-center py-96 justify-center">
      <h1 className="text-2xl bg-error-api text-center">{error?.message}</h1>
    </div>
   )
  }
  if(!data){
   return(
    <div className="flex justify-center items-center py-96">
      <Spinner color="info"/>
    </div>
   )
  }
  return (
   <>
     <h1 className="first-letter:capitalize text-2xl text-center text-blue-700">get post list</h1>
     <div className="container mx-auto gap-4 mt-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-6">
        {data?.map((i, index) => {
          return(
             <Card key={index}>
               <h2 className="text-2xl">{i?.title}</h2>
               <Link href={`/test/${i?.id}`}>
                 <p className="body">{i?.body}</p>
               </Link>
             </Card>
          )
        })
       }
     </div>
   </>
  )
}

export default GetListPost