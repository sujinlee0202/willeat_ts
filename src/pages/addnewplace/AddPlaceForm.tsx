import { VscCircleFilled } from 'react-icons/vsc'
import { Place } from '../../types/Place'
import React, { useState, useEffect } from 'react'
import { uploadImage } from '../../api/cloudinary'
import { addNewPlace } from '../../api/firebase'
import { useNavigate } from 'react-router-dom'
import ImageCarousel from '../../components/ImageCarousel'
import Loading from '../../layout/loading'

interface Props {
  place: Place
}

const AddPlaceForm = React.memo(({place}: Props) => {
  const [addPlace, setAddPlace] = useState<Place>({
    ...place
  })
  const [file, setFile] = useState<File[]>([])
  const [imageUrl, setImageUrl] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // place props를 가져오면 addplace에 state 적용하기
  useEffect(() => {
    setAddPlace({...place, category: '', description: '', review: ''})
  }, [place])
  
  // place 등록하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(addPlace.title === '') alert('가게명을 입력하세요')
    setLoading(true)
    
    Promise.all(file.map(uploadImage))
    .then(cloudinaryUrlArr => {
      addNewPlace(addPlace, cloudinaryUrlArr)
        .then(() => {
          setTimeout(() => alert('성공적으로 장소가 추가되었습니다'), 500)
          navigate('/')
        })
    })
    .finally(() => {
      setFile([])
      setLoading(false)
    })
  }

  // input state 변경하기
  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPlace(place => ({...place, category: e.target.value}))
  }

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPlace(place => ({...place, description: e.target.value}))
  }

  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddPlace(place => ({...place, review: e.target.value}))
  }

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPlace(place => ({...place, time: e.target.value}))
  }

  // 파일 업로드하기
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList
    if(!files) return

    const newFileArr = [...file]
    const newImageUrlArr: string[] = []

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i]
      newFileArr.push(fileData)
  
      const reader = new FileReader()
      reader.onload = () => {
        newImageUrlArr.push(reader.result as string)
        setImageUrl(newImageUrlArr)
      }
      reader.readAsDataURL(files[i])
    }
    setFile(newFileArr)
  }
  
  return (
    <form className="flex flex-col w-full gap-2 items-center" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 w-full">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <p className="w-24 shrink-0">이름</p>
        <p>{place.title !== '' ? place.title : '가게 이름을 검색하세요'}</p>
      </div>
      <div className="flex items-center gap-2 w-full">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <p className="w-24 shrink-0">상세주소</p>
        <p className='line-clamp-1'>{place.roadAddress !== '' ? place.roadAddress : '가게 이름을 검색하세요'}</p>
      </div>
      <div className="flex items-center gap-2 w-full">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <label className="shrink-0 w-24">카테고리</label>
        <input 
          type='text' 
          className='w-full border outline-orange-400 px-2' 
          placeholder='카테고리를 입력하세요'
          onChange={onChangeCategory}
          value={addPlace.category ?? ''}
          required
        />
      </div>
      <div className="flex items-center gap-2 w-full">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <label className="shrink-0 w-24">설명</label>
        <input 
          type='text'
          className='border outline-orange-400 px-2 w-full' 
          placeholder="설명을 입력하세요"
          onChange={onChangeDescription}
          value={addPlace.description ?? ''}
          required
        />
      </div>
      <div className="flex items-center gap-2 w-full">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <label className="w-24 shrink-0">운영자 평가</label>
        <textarea 
          className='border outline-orange-400 p-2 resize-none w-full' 
          placeholder='평가를 입력하세요'
          value={addPlace.review ?? ''}
          onChange={onChangeReview}
          required 
        />
      </div>
      <div className="flex items-center gap-2 w-full mb-2">
        <VscCircleFilled className='w-2 h-2 shrink-0' />
        <label className="w-24 shrink-0">영업시간</label>
        <input 
          type='text'
          className='border w-full outline-orange-400 px-2' 
          placeholder="영업시간을 입력하세요"
          value={addPlace.time ?? ''}
          onChange={onChangeTime}
        />
      </div>
      <input 
        type="file"
        className="w-24 pl-0.5
          text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-orange-400 file:text-white
          hover:file:bg-orange-500"
        onChange={onChangeFile}
        multiple
      />
      <div className="w-full h-[360px] relative shrink-0 border border-dashed border-orange-400 flex items-center justify-center">
        {imageUrl 
          ? <ImageCarousel url={imageUrl} />
          : '사진을 등록해 주세요'
        }
      </div>
      <button className="w-full h-12 shrink-0 rounded-xl bg-orange-400 hover:bg-orange-500 font-bold text-white">등록하기</button>
      {loading && <Loading />}
    </form>
  )
})

export default AddPlaceForm