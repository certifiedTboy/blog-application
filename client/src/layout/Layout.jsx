import NavBar from './NavBar'
import AppRoutes from './AppRoutes'

const Layout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <AppRoutes />
      </main>

      <footer></footer>
    </>
  )
}

export default Layout
