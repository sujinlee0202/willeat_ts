import { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface Props {
  url: string[]
  type: string
}

const ImageCarousel = ({url, type}: Props) => {
  const PHOTO_LENGTH = url.length-1

  const [selectedId, setSelectedId] = useState(0)
  const [prevId, setPrevId] = useState(PHOTO_LENGTH)
  const [nextId, setNextId] = useState(1)

  // url이 변경되었을 때 selectid 초기화
  useEffect(() => {
    setSelectedId(0)
  }, [url])

  useEffect(() => {
    if(selectedId === 1) {
      setPrevId(PHOTO_LENGTH)
    }

    if(selectedId === PHOTO_LENGTH) {
      setNextId(1)
    }
  }, [selectedId])

  const onClickLeftButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setSelectedId(prev => prev - 1)
    setPrevId(prev => prev - 1)
    setNextId(selectedId)

    if(selectedId === 0) setSelectedId(PHOTO_LENGTH)
  }

  const onClickRightButton = (e: any) => {
    e.stopPropagation()

    setSelectedId(prev => prev + 1)
    setPrevId(selectedId)
    setNextId(prev => prev + 1)

    if(selectedId === PHOTO_LENGTH) setSelectedId(0)
  }

  return (
    <>
      {url && url.map((url, index) => (
        <img 
          src={url} 
          alt='place'
          key={index}
          className={`
            w-full h-full absolute top-0 z-10 opacity-0 transition duration-500 rounded-lg object-cover
            ${type === 'detail' && 'rounded-none'}
            ${index === selectedId && 'opacity-100 relative z-30'}
            ${url.length === 1 && (index === prevId && '-translate-x-full absolute z-20')}
            ${url.length === 1 && (index === nextId && 'translate-x-full absolute z-10')}`}
        />
      ))}
      {
        url.length !== 1 && (
            <div className='flex absolute top-1/2 -translate-y-1/2 w-full px-2 h-8 z-50'>
            <button
              type='button'
              className={`w-8 h-8 absolute left-2 bg-gray-200 opacity-60 flex items-center justify-center rounded-full hover:scale-110`}
              onClick={onClickLeftButton}
            ><AiOutlineLeft /></button>
            <button
              type='button'
              className={`w-8 h-8 absolute right-2 bg-gray-200 opacity-60 flex items-center justify-center rounded-full hover:scale-110`}
              onClick={onClickRightButton}
            ><AiOutlineRight /></button>
          </div>
        )
      }
    </>
  )
}

export default ImageCarousel