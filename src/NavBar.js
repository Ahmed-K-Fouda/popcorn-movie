import { Logo } from "./Logo";

export function NavBar({ /*movies*/ children }) {
  return (
    <nav className="nav-bar">
      {/* <Logo />
            <Search />
            <NumResult movies={movies} /> */}
      {/* component composition */}
      <Logo />
      {children}
    </nav>
  );
}
