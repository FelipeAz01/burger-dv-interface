import { SignOut } from '@phosphor-icons/react';

import Logo from '../../assets/logo.svg';
import { useUser } from '../../hooks/UserContext';
import { NavLinks } from '../../layouts/AdminLayout/NavLinks';
import { Container, NavLink, NavLinkContainer, Footer } from './styles';

export function SideNavAdmin() {
  const { logout } = useUser();
  return (
    <Container>
      <img src={Logo} alt="Hambuguer logo dv" />
      <NavLinkContainer>
        {NavLinks.map((link) => (
          <NavLink key={link.id} to={link.path}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink>
          <SignOut to="/login" onClick={logout} />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  );
}
