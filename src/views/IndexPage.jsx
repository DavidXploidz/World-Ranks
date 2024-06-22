import Search from "../components/Search"

export default function IndexPage() {
  return (
    <div className='container page page--out'>
      <header className='page__header'>
        <span>Found 234 countries</span>
        <Search />
      </header>
      <aside className='page__aside'>
        Este es el aside
      </aside>
      <main className='page__main'>
        Este es el main
      </main>
    </div>
  )
}
