import React, { useRef } from "react";
import { animateScroll as scroll } from 'react-scroll';
import "../style/scroll.css";
import Steps from "./Steps";
import people1 from "./assets/people1.png";

function HomeNoToken() {
    const secondHeroRef = useRef(null); // reference to the second hero

    const scrollToSecondHero = () => {
        // if current exists, then scroll to the element
        if (secondHeroRef.current) {
            scroll.scrollTo(secondHeroRef.current.offsetTop);
        }
    }

    return (
        <>
            <div className="hero h-screen bg-base-100 flex flex-col justify-start">
                <div className="hero-content mt-36">
                    <img
                        src={people1}
                        className="max-w-sm"
                        alt="people cartoon"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            Friend Forge (BETA)
                        </h1>
                        <p className="py-10 text-2xl">
                            Your friends are waiting
                        </p>
                            <a href="/friendforge/signup" className="btn btn-primary rounded-btn">
                                CREATE ACCOUNT
                            </a>
                    </div>
                </div>
                <div className="mt-36">
                    <button 
                        className="btn btn-sm btn-ghost rounded-btn"
                        onClick={scrollToSecondHero} // on click, scroll to the second hero
                    >
                        LEARN MORE
                    </button>
                    <svg className="arrows" onClick={scrollToSecondHero}>
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
            </div>

            <div className="hero gradient-bg">
                <div className="hero-overlay bg-opacity-10"></div>
            </div>

            <div 
                className="hero h-screen bg-base-100"
                ref={secondHeroRef} // set the ref
            >
                <Steps />
            </div>
        </>
    );
}

export default HomeNoToken;
