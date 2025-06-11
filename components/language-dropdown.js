'use client'

import { useState, useEffect } from 'react';
import { Dropdown, Button } from 'antd';

export default function LanguageDropdown() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('language');
    if (stored) {
      setLanguage(stored);
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    setLanguage(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', key);
    }
  };

  const items = [
    { label: 'English', key: 'en' },
    { label: 'French', key: 'fr' },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight">
      <Button>{language === 'en' ? 'English' : 'French'}</Button>
    </Dropdown>
  );
}
