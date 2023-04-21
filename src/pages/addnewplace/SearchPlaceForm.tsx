import { useState } from "react"
import { searchNaver } from "../../api/naver-search"
import { searchMap } from "../../api/naver-map";

interface Place {
  roadAddress: string;
  description: string;
  mapx: number;
  mapy: number;
  title: string;
}

const SearchPlaceForm = () => {
  const [selected, setSelected] = useState(-1)
  const [inputPlace, setInputPlace] = useState('')
  const [place, setPlace] = useState<Place[]>([])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlace(e.target.value)
    if(e.target.value.length === 0) {
      setPlace([])
      setSelected(-1)
    }
  }

  const onClickSelectPlace = (index: number) => {
    setSelected(index)
    searchMap(place[index].mapx, place[index].mapy)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    searchNaver(inputPlace)
    .then(res => setPlace(
      res.data.items.map((item: Place) => {
        return {
          ...item,
          title: item.title.replace(/<\/?b>/gi, ""),
          mapx: Number(item.mapx),
          mapy: Number(item.mapy)
        }
      })
    ))
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <form className="flex items-center border rounded-xl overflow-hidden shrink-0" onSubmit={handleSubmit}>
        <input 
          type='text' 
          className='w-full h-12 px-2 box-border rounded-l-xl outline-1 outline-orange-400' 
          placeholder='가게명을 입력하세요' 
          value={inputPlace}
          onChange={onChangeInput}
          required
        />
        <button className="shrink-0 h-12 w-12 font-bold text-white bg-orange-400 hover:bg-orange-500">검색</button>
      </form>
      <ul className="flex flex-col gap-2 w-full">
        {place.map((item: any, index: number) => (
          <li 
            className={`cursor-pointer hover:text-orange-500 ${selected === index && 'text-orange-500'}`} 
            key={index}
            onClick={() => onClickSelectPlace(index)}
          >
            <div className="font-bold">{item.title}</div>
            <div className="line-clamp-1 text-sm">{item.roadAddress}</div>
          </li>
        ))}

      </ul>
      {place.length > 0 && (
        <div id='map' className="w-full h-80 border border-dashed border-orange-400 flex items-center justify-center">
          음식점을 클릭하면 지도가 보입니다
        </div>
      )}
    </div>
  )
}

export default SearchPlaceForm