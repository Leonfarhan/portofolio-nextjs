'use client';
// RequestedPath: the address the reader could not find, printed under "Media offline". The path is read from
// location.pathname after mount, so the server renders nothing and the markup never disagrees with the URL.
import { useEffect, useState } from 'react';

export function RequestedPath({ className }: { className?: string }) {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(location.pathname);
  }, []);

  return path ? <p className={className}>{path}</p> : null;
}
