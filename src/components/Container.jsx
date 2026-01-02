import React from 'react'

const Container = ({children, className}) => {
  return (
    <div>
      <div className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Container
