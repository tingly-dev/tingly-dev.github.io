import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.2s ease;
`;

const HeaderContent = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }
`;

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0a0a0a;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #2563eb;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #2563eb;
  }
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #1e293b;
    border-color: #2563eb;
    background: rgba(37, 99, 235, 0.04);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled.a`
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.04);
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <HeaderContainer
      style={{
        boxShadow: isScrolled ? '0 2px 8px -2px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      <HeaderContent>
        <Logo href="/">
          <LogoText>Tingly Box</LogoText>
        </Logo>

        <Nav>
          <NavLink href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
            Features
          </NavLink>
          <NavLink href="#quick-start" onClick={(e) => { e.preventDefault(); scrollToSection('quick-start'); }}>
            Quick Start
          </NavLink>
          <NavLink href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
            FAQ
          </NavLink>
        </Nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <GitHubButton
            href="https://github.com/tingly-dev/tingly-box"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub style={{ width: '1rem', height: '1rem' }} />
            <span style={{ display: 'inherit' }}>GitHub</span>
          </GitHubButton>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </MobileMenuButton>
        </div>
      </HeaderContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink
          href="#features"
          onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
        >
          Features
        </MobileNavLink>
        <MobileNavLink
          href="#quick-start"
          onClick={(e) => { e.preventDefault(); scrollToSection('quick-start'); }}
        >
          Quick Start
        </MobileNavLink>
        <MobileNavLink
          href="#faq"
          onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
        >
          FAQ
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
