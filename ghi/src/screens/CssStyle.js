import React from 'react'
import buttonbold from "./images/button-bold.png";


function CssStyle() {
  return (
    <>
      <h3 className='center-txt extra-p60'>Quick CSS stying code</h3>
      <p className='center-txt'>Note: Base Bootstrap is installed, feel free to use those tags as well if they work.</p>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">class name</th>
              <th scope="col">description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">button-bold</th>
              <td><img src={buttonbold}/><br/>
              can be used on buttons or plain links. will add a hover effect</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CssStyle
