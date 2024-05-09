import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Gi3dGlasses } from "react-icons/gi";
import { MdSearch } from "react-icons/md";




const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='text-white bg-black md:bg-transparent md:w-full h-20 flex p-4 px-8 items-center justify-around backdrop-blur-lg border-b-[1px] border-white'>
        <div className='flex items-center'
            onClick={()=>{navigate('/')}}>
            <Gi3dGlasses size={40} />
            <h1 className='ml-2 text-4xl font-rowdies'>OnAnime</h1>
        </div>
        <div className='flex'>
            <button className='p-2 text-xl'>
                Home
            </button>
            <button className='p-2 text-xl'>
                AnimeList
            </button>
            <button className='p-2 text-xl'>
                News
            </button>
            <button className='p-2 text-xl'>
                Top Anime
            </button>

        </div>

        <div className='flex items-center h-12 relative rounded-2xl bg-white bg-opacity-15 border-2 border-white'>
            <div className=' absolute right-2'><MdSearch size={25} color='black' /></div>
            
            <input placeholder='Search' className='w-[50vh] p-4 bg-transparent focus-within:bg-white focus:rounded-2xl focus:h-12 focus:text-black' type="text" />
        </div>

        <div>
            <button className='bg-white text-black p-2 ml-2 rounded-xl px-4'>
                Login
            </button>
            <button className='bg-white text-black p-2 ml-2 rounded-xl px-4'>
                SignUp
            </button>
        </div>
    </div>
  )
}

export default Navbar