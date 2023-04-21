import SearchPlaceForm from "./SearchPlaceForm"
import AddPlaceForm from "./AddPlaceForm"

const AddNewPlace = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-4 h-5/6 lg:h-fit w-5/6 max-w-screen-xl mx-auto overflow-y-auto pr-1 lg:pr-0">
      <SearchPlaceForm />
      <div className='border-b lg:border-r'></div>
      <AddPlaceForm />
    </section>
  )
}

export default AddNewPlace