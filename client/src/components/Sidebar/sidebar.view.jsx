import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dock, GraduationCap, User, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import './sidebar.css';

const navItems = [
  { to: '/',         icon: Dock,          label: 'Dashboard' },
  { to: '/students', icon: GraduationCap, label: 'Students' },
  { to: '/teachers', icon: User,          label: 'Teachers' },
];

const SidebarView = ({ onLogout, isLoggingOut, toggleTheme, isDark, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ── TOP NAVBAR ── */}
      <nav className="fb-navbar">
        <div className="fb-navbar-inner">
          <div className="fb-navbar-left">
            <button
              className="fb-navbar-hamburger"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle sidebar"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <a href="/" className="fb-navbar-brand">
              <span className="fb-navbar-brand-name">SMS Admin</span>
            </a>
          </div>

          <div className="fb-navbar-right">
            <button className="fb-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="fb-user-wrapper">
              <button
                className="fb-user-avatar-btn"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user"
                />
              </button>

              {dropdownOpen && (
                <div className="fb-dropdown">
                  <div className="fb-dropdown-header">
                    <p className="fb-dropdown-name">Admin</p>
                    <p className="fb-dropdown-email">admin@sms.com</p>
                  </div>
                  <ul className="fb-dropdown-menu">
                    <li>
                      <button 
                        className="fb-dropdown-item fb-dropdown-signout" 
                        onClick={onLogout}
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? (
                          <>
                            <span className="logout-spinner"></span>
                            Logging out...
                          </>
                        ) : (
                          <>
                            <LogOut size={14} /> Sign out
                          </>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── SIDEBAR ── */}
      <aside className={`fb-sidebar ${mobileOpen ? 'fb-sidebar--open' : ''}`}>
        <div className="fb-sidebar-inner">
          <div className="fb-sidebar-brand">
            <span className="fb-sidebar-brand-name">SMS Admin</span>
          </div>

          <ul className="fb-nav">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <button
                  className={`fb-nav-link${location.pathname === to ? ' fb-nav-link--active' : ''}`}
                  onClick={() => {
                    onNavigate(to);
                    setMobileOpen(false);
                  }}
                >
                  <Icon size={18} className="fb-nav-icon shrink-0" />
                  <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fb-overlay sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarView;