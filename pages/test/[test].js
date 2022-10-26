import React from "react"
import {useRouter} from "next/router"
import axios from "axios"
import useSWR from "swr"
import {Card, Spinner} from "flowbite-react"
import Link from "next/link"
const Test = () => {
  const router = useRouter()
  const fetcher = (url) => axios.get(url).then(res => res?.data)
  const {data, error} = useSWR(`https://jsonplaceholder.typicode.com/posts/${router.query.test}`, fetcher)
  if (error) {
    return (
      <div className="flex items-center py-96 justify-center">
        <h1 className="text-2xl bg-error-api text-center">{error?.message}</h1>
      </div>
    )
  }
  return (
    <div className="custom-bg">
      <div className="container mx-auto mt-2 flex items-center py-72 justify-center">
        {
          !data ? <Spinner color="info" />
            :
            <Card>
              <h1>Id: {data?.id}</h1>
              <p>Title: {data?.title}</p>
              <p>Body: {data?.body}</p>
              <Link href="/list">
                <a className="body">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                </a>
              </Link>
            </Card>
        }
      </div>
    </div>
  )
}

export default Test