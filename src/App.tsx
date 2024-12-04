import CharacterList from "./components/character/character-list/character-list"
import FilterArea from "./components/filter-area/filter-area"
import HeaderTitle from "./components/header-title/header-title"

function App() {
  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto">
      <HeaderTitle />
      <FilterArea />
      <CharacterList />
    </div>
  )
}

export default App
