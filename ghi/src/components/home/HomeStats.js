import React from 'react'

function HomeStats() {
  return (
    <section class="body-font">
      <div class="container px-5 py-20 mx-auto">
        <div class="flex flex-wrap -m-20 text-center">
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl">2.7K</h2>
            <p class="leading-relaxed">Users</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl">1.8K</h2>
            <p class="leading-relaxed">Groups</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl">9.5K</h2>
            <p class="leading-relaxed">Messages</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl">3.8K</h2>
            <p class="leading-relaxed">Friends</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeStats
