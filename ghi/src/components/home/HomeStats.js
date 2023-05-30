import React from 'react'

function HomeStats() {
  return (
    <section className="body-font">
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-wrap -m-20 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl">2.7K</h2>
            <p className="leading-relaxed">Users</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl">1.8K</h2>
            <p className="leading-relaxed">Groups</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl">9.5K</h2>
            <p className="leading-relaxed">Messages</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl">3.8K</h2>
            <p className="leading-relaxed">Friends</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeStats
