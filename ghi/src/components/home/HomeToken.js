import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileValidator from '../userProfileValidator';
import "../style/navwheel.css";
import useProfile from '../useProfile';


function HomeToken(token) {
  const { profile } = useProfile(token.token);
  const navigate = useNavigate();



  return (
<UserProfileValidator>
  {hasProfile => (
    <div className='flex flex-col items-center'>
      {!hasProfile ? (
        <div className='card w-96 glass hover:scale-100 justify-center items-center'>
          <button className='mt-5 btn btn-primary' onClick={() => navigate('signup/profile')}>Create profile</button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="links">
            <ul className="links__list" style={{"--item-total": 5}}>
              <li className="links__item" style={{"--item-count": 1}}>
                <a className="links__link" href="/friendforge/forge">
                  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="84px" height="84px" viewBox="0 0 275.176 275.176" stroke="#000000" stroke-width="2.476584" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M266.81,133.973c-1.19-38.825-32.568-67.016-33.745-68.046l-30.099-30.201c-0.66-0.659-1.547-1.03-2.478-1.03h-0.003 c-0.935,0-1.824,0.368-2.478,1.026l-9.104,9.098l-10.328-10.326l9.1-9.101c1.369-1.371,1.369-3.585,0-4.956l-19.407-19.41 C167.609,0.368,166.722,0,165.792,0s-1.824,0.368-2.478,1.027l-47.542,47.542c-1.369,1.371-1.369,3.587,0,4.956l19.411,19.411 c0.659,0.659,1.549,1.026,2.478,1.026s1.822-0.368,2.478-1.026l9.118-9.119l10.332,10.328l-7.471,7.467 c-1.369,1.371-1.369,3.584,0,4.955l8.586,8.584L11.618,244.233c-0.519,0.52-0.789,1.211-0.859,1.937 c-4.173,7.536-2.892,17.118,3.28,23.284c3.692,3.689,8.6,5.723,13.82,5.723c3.256,0,6.42-0.801,9.248-2.32 c0.813-0.068,1.588-0.421,2.177-1.014l2.101-2.128c0.082-0.068,0.166-0.137,0.247-0.219c0.034-0.028,0.066-0.062,0.098-0.089 c0,0,84.962-85.164,146.401-146.813l16.844,16.849c33.373,33.369,28.131,53.122,28.018,53.52c-0.489,1.529,0.123,3.196,1.492,4.045 c0.571,0.355,1.211,0.523,1.845,0.523c0.903,0,1.803-0.353,2.478-1.026C258.067,177.237,267.485,156.202,266.81,133.973z M137.657,65.502l-14.456-14.455l42.59-42.583l14.452,14.455L137.657,65.502z M36.788,264.427c0,0-0.003,0-0.003,0.003 c-0.041,0.041-0.08,0.075-0.115,0.109l-1.203,1.201c-0.251,0.093-0.493,0.216-0.722,0.366c-4.81,3.183-11.641,2.499-15.754-1.615 c-4.175-4.168-4.861-10.779-1.631-15.711c0.154-0.236,0.281-0.489,0.368-0.749l146.273-146.271l17.525,17.521 C120.793,180.218,38.302,262.911,36.788,264.427z M154.218,58.868l19.403-19.416l10.324,10.319l-9.653,9.661l-9.753,9.753 L154.218,58.868z M240.097,184.803c-1.263-10.197-7.382-27.541-30.167-50.326l-50.381-50.388l7.454-7.453 c0.007-0.004,0.014-0.007,0.021-0.011l9.633-9.64l23.829-23.823l27.78,27.867c0.302,0.271,30.444,27.333,31.543,63.161 C260.346,151.882,253.724,168.876,240.097,184.803z"></path> </g> </g></svg>
                  <span className="links__text">Forge</span>
                </a>
              </li>
              <li className="links__item" style={{"--item-count": 2}}>
                <a className="links__link" href="/friendforge/mygroups">
                  <svg width="90px" height="90px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="1.5" stroke="#222222" stroke-linecap="round"></circle> <path d="M15.701 8.25C15.8999 7.90547 16.2275 7.65408 16.6118 7.55111C16.996 7.44815 17.4055 7.50205 17.75 7.70096C18.0945 7.89987 18.3459 8.2275 18.4489 8.61177C18.5519 8.99604 18.498 9.40547 18.299 9.75C18.1001 10.0945 17.7725 10.3459 17.3882 10.4489C17.004 10.5519 16.5945 10.498 16.25 10.299C15.9055 10.1001 15.6541 9.7725 15.5511 9.38823C15.4481 9.00396 15.502 8.59453 15.701 8.25L15.701 8.25Z" stroke="#222222"></path> <path d="M5.70096 8.25C5.89987 7.90547 6.2275 7.65408 6.61177 7.55111C6.99604 7.44815 7.40547 7.50205 7.75 7.70096C8.09453 7.89987 8.34592 8.2275 8.44889 8.61177C8.55185 8.99604 8.49795 9.40547 8.29904 9.75C8.10013 10.0945 7.7725 10.3459 7.38823 10.4489C7.00396 10.5519 6.59453 10.498 6.25 10.299C5.90547 10.1001 5.65408 9.7725 5.55111 9.38823C5.44815 9.00396 5.50205 8.59453 5.70096 8.25L5.70096 8.25Z" stroke="#222222"></path> <path d="M20.3639 15.5122L20.8501 15.3957L20.3639 15.5122ZM14.1 13.1854L13.8093 12.7786L13.2769 13.1589L13.7838 13.5727L14.1 13.1854ZM15.3804 15.5097L14.8911 15.6125L15.3804 15.5097ZM19.4999 16H14.5V17H19.4999V16ZM19.8776 15.6288C19.9012 15.7271 19.8757 15.8068 19.8169 15.8717C19.7527 15.9424 19.6412 16 19.4999 16V17C20.2996 17 21.0709 16.3171 20.8501 15.3957L19.8776 15.6288ZM16.5 13C17.726 13 18.4895 13.4087 18.9822 13.9118C19.4884 14.4286 19.7475 15.0859 19.8776 15.6288L20.8501 15.3957C20.6963 14.7541 20.3754 13.9052 19.6966 13.2121C19.0043 12.5051 17.9778 12 16.5 12V13ZM14.3906 13.5922C14.8685 13.2508 15.54 13 16.5 13V12C15.3544 12 14.4745 12.3034 13.8093 12.7786L14.3906 13.5922ZM13.7838 13.5727C14.4368 14.1059 14.7483 14.9336 14.8911 15.6125L15.8697 15.4068C15.7084 14.6398 15.3299 13.5441 14.4162 12.7981L13.7838 13.5727ZM14.8911 15.6125C14.9127 15.7155 14.8843 15.801 14.8215 15.8694C14.7542 15.9427 14.641 16 14.5 16V17C15.3038 17 16.0615 16.3194 15.8697 15.4068L14.8911 15.6125Z" fill="#222222"></path> <path d="M9.90001 13.1854L10.2162 13.5727L10.7231 13.1589L10.1907 12.7785L9.90001 13.1854ZM3.63614 15.5122L4.12237 15.6288L3.63614 15.5122ZM8.61961 15.5097L8.13031 15.4068H8.1303L8.61961 15.5097ZM7.50004 13C8.45997 13 9.13146 13.2508 9.60936 13.5922L10.1907 12.7785C9.5255 12.3033 8.64563 12 7.50004 12V13ZM4.12237 15.6288C4.25249 15.0859 4.51165 14.4286 5.01783 13.9118C5.51048 13.4087 6.27401 13 7.50004 13V12C6.02223 12 4.99575 12.5051 4.30339 13.2121C3.62456 13.9052 3.30369 14.7541 3.14991 15.3957L4.12237 15.6288ZM4.50005 16C4.3588 16 4.24729 15.9424 4.18312 15.8717C4.12432 15.8068 4.09879 15.7271 4.12237 15.6288L3.14991 15.3957C2.92906 16.3171 3.70041 17 4.50005 17V16ZM9.5 16H4.50005V17H9.5V16ZM9.5 16C9.35899 16 9.24574 15.9427 9.17843 15.8694C9.11567 15.801 9.08727 15.7155 9.10892 15.6125L8.1303 15.4068C7.93849 16.3194 8.69612 17 9.5 17V16ZM9.10892 15.6125C9.25163 14.9336 9.56317 14.1059 10.2162 13.5727L9.58379 12.7981C8.67006 13.5441 8.29153 14.6398 8.13031 15.4068L9.10892 15.6125Z" fill="#222222"></path> <path d="M12 12.5C14.3642 12.5 15.1314 14.3251 15.3804 15.5097C15.494 16.0501 15.0523 16.5 14.5 16.5H9.5C8.94772 16.5 8.50601 16.0501 8.61961 15.5097C8.86859 14.3251 9.63581 12.5 12 12.5Z" stroke="#222222" stroke-linecap="round"></path> <path d="M18.5 21.5H20C20.8284 21.5 21.5 20.8284 21.5 20V18.5" stroke="#222222" stroke-linecap="round"></path> <path d="M18.5 2.5H20C20.8284 2.5 21.5 3.17157 21.5 4V5.5" stroke="#222222" stroke-linecap="round"></path> <path d="M5.5 21.5H4C3.17157 21.5 2.5 20.8284 2.5 20V18.5" stroke="#222222" stroke-linecap="round"></path> <path d="M5.5 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V5.5" stroke="#222222" stroke-linecap="round"></path> </g></svg>
                  <span className="links__text">My groups</span></a>
              </li>
              <li className="links__item" style={{"--item-count": 3}}>
                <a className="links__link" href="/friendforge/friends">
                  <svg fill="#000000" height="90px" width="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.365 425.365"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M397.644,135.13c-7.501-7.495-16.135-13.438-25.502-17.711c16.964-11.587,28.123-31.074,28.123-53.123 C400.265,28.843,371.422,0,335.969,0s-64.296,28.843-64.296,64.296c0,21.526,10.644,40.6,26.933,52.276 c-21.984,8.484-40.866,24.316-52.907,45.341c-3.646,6.354-10.456,10.302-17.773,10.302l-30.493,0 c-7.319,0-14.126-3.945-17.765-10.297c-12.046-21.028-30.93-36.86-52.913-45.345c16.289-11.676,26.933-30.75,26.933-52.276 C153.687,28.843,124.844,0,89.391,0S25.095,28.843,25.095,64.296c0,22.062,11.172,41.559,28.153,53.144 C23.14,131.204,2.168,161.605,2.168,196.816v71.286c0,14.577,9.667,26.938,22.928,31.008v100.97c0,13.94,11.341,25.281,25.28,25.281 h78.031c13.939,0,25.28-11.341,25.28-25.281V219.873c14.73,9.957,32.25,15.433,50.331,15.433l17.322,0.001 c12.724,0,25.056-2.63,36.651-7.817c4.815-2.154,9.385-4.691,13.687-7.597v180.193c0,13.939,11.34,25.279,25.279,25.279h78.031 c13.939,0,25.279-11.34,25.279-25.279V299.108c13.262-4.07,22.93-16.433,22.93-31.011v-71.285 C423.198,173.514,414.123,151.609,397.644,135.13z M335.969,19c24.977,0,45.296,20.32,45.296,45.296s-20.319,45.296-45.296,45.296 s-45.296-20.32-45.296-45.296S310.992,19,335.969,19z M44.095,64.296C44.095,39.32,64.415,19,89.391,19s45.296,20.32,45.296,45.296 s-20.32,45.296-45.296,45.296S44.095,89.272,44.095,64.296z M204.018,216.306c-20.048,0-39.222-8.539-52.634-23.433 c-2.258-2.507-5.672-3.776-8.983-3.129c-4.561,0.891-7.713,4.847-7.713,9.333V400.08c0,3.469-2.812,6.281-6.281,6.281h-24.064 c-3.01,0-5.451-2.44-5.451-5.451v-94.16c0-5.06-3.818-9.478-8.867-9.805c-5.533-0.358-10.133,4.024-10.133,9.479v94.485 c0,3.01-2.44,5.451-5.451,5.451H50.376c-3.468,0-6.28-2.812-6.28-6.28l0-109.051c0-5.246-4.251-9.501-9.498-9.5 c-7.405,0.001-13.43-6.023-13.43-13.428v-70.608c0-37.899,31.01-69.206,68.907-68.899c30.211,0.244,58.233,16.657,73.208,42.944 c6.968,12.232,20.072,19.675,34.15,19.675h13.289c6.529,0,12.244,4.836,12.856,11.337c0.702,7.459-5.172,13.755-12.489,13.755 H204.018z M404.198,268.097c0,7.406-6.026,13.432-13.433,13.43c-5.246-0.001-9.497,4.254-9.497,9.5v109.059 c0,3.468-2.811,6.279-6.279,6.279H350.92c-3.01,0-5.451-2.44-5.451-5.451V306.75c0-5.06-3.819-9.478-8.869-9.805 c-5.533-0.358-10.131,4.024-10.131,9.48v94.49c0,3.01-2.44,5.451-5.451,5.451h-24.061c-3.468,0-6.279-2.811-6.279-6.279v-200.67 c0-3.539-1.787-6.938-4.886-8.646c-3.949-2.176-8.769-1.294-11.691,1.97c-6.671,7.449-14.7,13.306-23.867,17.407 c-2.986,1.335-6.039,2.433-9.139,3.336c0.996-3.065,1.54-6.331,1.54-9.723c0-5.118-1.233-9.951-3.405-14.229 c9.554-2.871,17.86-9.291,22.953-18.17c15.107-26.38,43.38-42.768,73.784-42.768c18.221,0,35.354,7.095,48.244,19.975 c12.889,12.888,19.986,30.021,19.986,48.245V268.097z"></path> </g></svg>
                  <span className="links__text">Friends</span></a>
              </li>
              <li className="links__item" style={{"--item-count": 4}}>
                <a className="links__link" href={`/friendforge/profile/${profile.username}`}>
                  <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="0.768" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <span className="links__text">Profile</span></a>
              </li>
              <li className="links__item" style={{"--item-count": 5}}>
                <a className="links__link" href="/friendforge/explore">
                  <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 18C16.9706 18 21 13.9706 21 9C21 7.15984 20.4477 5.44866 19.4999 4.02317M12 18C8.87958 18 6.13007 16.412 4.51555 14M12 18V21M7 21H17M21 3L19.5 4M4.5 14L3 15M17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9Z" stroke="#000000" stroke-width="0.9120000000000001" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <span className="links__text">Explore</span></a>
              </li>
            </ul>
          </div>
          
        </div>
      )}
    </div>
    
  )}
</UserProfileValidator>

  );
}

export default HomeToken;







