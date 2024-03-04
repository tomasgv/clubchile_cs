import maoiImg from './svg/moai-chile-svgrepo-com.svg';
import chileFlag from './svg/flag-for-flag-chile-svgrepo-com.svg';
import instaImg from './svg/instagram-svgrepo-com.svg';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState, useContext, createContext} from 'react';
import axios from 'axios';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withXSRFToken = (config) => !!config.useCredentials;

const client = axios.create({
    withCredentials: true
});


export const AuthContext = createContext(null);


export default function Root () {


    const [isLogged, setIsLogged] = useState(false);
    const loginInReact = () => setIsLogged(true);
    const logoutInReact = () => setIsLogged(false);
    const navigate = useNavigate()


    /* we want to control the top navbar */
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visibleNavBar, setVisibleNavBar] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > prevScrollPos) {     
            setVisibleNavBar(false);
        } else {
            setVisibleNavBar(true);
        }
        setPrevScrollPos(currentScrollPos);    
    }

    const handleLogout = (e) => {
        let csrfToken  = "{% csrf_token %}"
        client.post(
            "api-user/logout/"
        ).then ((response) => {
            setIsLogged(false);
        }).then(() => {
            navigate("/");
        })

        /* client.post(
            "api-user/test/") */

    }


    /* console.log(isLogged); */


    
    /* For controlling the navbar disappearance */
    useEffect( () => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos] )

    useEffect ( () => {
        axios.get("api-user/user")
            .then( (response) => {
                setIsLogged(true);
            }).catch ( (error) => {
                setIsLogged(false);
            })
    }, []);


    return (
    <>
    <AuthContext.Provider value={{isLogged, loginInReact, logoutInReact}}>

    {/* --------- Init navbar ----------- */}
    <div className={`navbar bg-base-100 z-50 fixed top-0 transition-transform ease-in-out duration-500 ${visibleNavBar ? '' : '-translate-y-20'} `}>
        <div className="navbar-start">
            <div className="dropdown">
                
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>

            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Actividades</a></li>
                <li>
                <a>Parent</a>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
                </li>
                <li><Link to={'/Nosotros'}>Nosotros</Link></li>
                <li><Link to={'/Inventario'}>Inventario</Link></li>
            </ul>

            </div>
            <Link to={"/"} className="btn btn-ghost text-xl">
                <img src={chileFlag} className='' width="30px" alt="Chilean flag"/>
                Club Chileno
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><a>Actividades</a></li>
            <li>
                <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
                </details>
            </li>
            <li><Link to={'/Nosotros'}>Nosotros</Link></li>
            <li><Link to={'/Inventario'}>Inventario</Link></li>
            </ul>
        </div>
        <div className="navbar-end">
            {/* Icono de instagram */}
            <a className="btn btn-ghost"><img src={instaImg} width="30px" alt="Chilean flag"/></a>

            {/* Icono de perfil */}
            { isLogged ? 
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-9">
                            <path strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to={"/Account"}>Account</Link></li>
                        <li><a onClick={(e) => handleLogout(e)}>Logout</a></li>
                    </ul>
                </div>
            : 
                <Link to={'/Login'} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-9">
                        <path strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link>
            }
            
        </div>
    </div>

    {/* --------- End navbar ----------- */}


    {/* --------- Contenido ------------ */}

    <div className='w-full'>
        <Outlet />
    </div>


    {/* Añadir un footer */}
    
    <footer className="footer items-center p-4 bg-neutral h-16 text-neutral-content">
        <aside className="items-center grid-flow-col">
            <img src={maoiImg} className='-scale-x-90' width="25px" alt="Moai"/>
            <p>Copyright © 2024 - All right reserved</p>
        </aside> 
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
            </a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
        </nav>
    </footer>

    </AuthContext.Provider>

    </>);
}