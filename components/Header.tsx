import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropDownList from './DropDownList'
import RecordScreen from './RecordScreen'



const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header className='header'>
      <section className='header-container'>
        <div className='details'>
          {userImg && (
            <Image
              src={userImg || '/assets/icons/dummy.jpg'}
              alt='User avatar'
              width={66}
              height={66}
              className='rounded-full'
            />
          )}
          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>

        <aside>
          <Link href='/upload' className='flex items-center gap-2'>
            <Image src='/assets/icons/upload.svg' alt='Upload icon' width={16} height={16} />
            <span>Upload a video</span>
          </Link>
          <RecordScreen/>
        </aside>
      </section>

      <section className='search-filter'>
        <div className='search'>
          <input type='text' placeholder='Search for Video' />
          <Image src='/assets/icons/search.svg' alt='Search icon' width={16} height={16} />
        </div>
        <DropDownList />
      </section>
    </header>
  )
}

export default Header
