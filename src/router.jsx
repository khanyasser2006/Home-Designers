import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children }) {
  const [path, setPath] = useState(
    window.location.pathname === '' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname || '/';
      setPath(newPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (toPath) => {
    if (toPath === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', toPath);
    setPath(toPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, className = '', onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
