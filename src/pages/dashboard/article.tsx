import React from 'react'
import Dashboard from '@/containers/dashboard.container'
import { LuConstruction } from 'react-icons/lu'

const Article = () => {
  return (
    <Dashboard>
      <div className="flex flex-col justify-center items-center h-full">
        <LuConstruction size={96} className="text-orange-500"/>
        <div className="font-semibold">Article</div>
      </div>
    </Dashboard>
  )
}

export default Article
