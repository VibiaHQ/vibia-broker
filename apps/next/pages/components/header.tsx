import { useEffect } from 'react';

interface HeaderProps {
  language?: "es" | "en" | "it" | "fr" | "de";
  catalog?: "int" | "usa";
}

export const Header: React.FC<HeaderProps> = ({ language = "en", catalog = "int" }) => {
  //TODO: Refactor this in a future, this route should be dynamic and not hardcoded
  let urlIframe = `https://vibia.dev/tools/components/header`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.url) {
        window.location.href = event.data.url;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };

  }, []);

  return (
    <iframe
      src={urlIframe+`?withOutFooter=true&catalog=${catalog}&language=${language}&_locale=${language}&_catalog=${catalog}`}
      sandbox="allow-scripts allow-same-origin allow-forms"
      style={{
        border: 'none',
        width: '100%',
        height: 'inherit',
        flex: 'auto'
      }}
      scrolling="no"
      frameBorder="0"
    ></iframe>

  );
}
