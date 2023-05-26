import React from 'react'
import stepone from "./stepone.png";
import steptwo from "./steptwo.png";
import stepthree from "./stepthree.png";

function Steps() {
  return (
    <section class="body-font">
      <div class="container px-5 py-20 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h2 class="text-xs tracking-widest font-medium title-font mb-1">LEARN HOW</h2>
          <h1 class="sm:text-3xl text-2xl font-medium title-font ">Friend Forge Works</h1>
        </div>
        <div class="flex flex-wrap -m-4">


          <div class="p-4 md:w-1/3 ">
            <div class="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
              <div class="flex items-center mb-3">
                image here
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
              <div class="flex items-center mb-3">
                image here
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full p-8 flex-col bg-accent text-neutral">
              <div class="flex items-center mb-3">
                  image here
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default Steps
