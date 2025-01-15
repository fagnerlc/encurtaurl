import { useState, useEffect } from 'react';
import URLShortenerForm from '../components/URLShortenerForm';
import URLList from '../components/URLList';

interface ShortenedURL {
  _id: string;
  shortId: string;
  originalUrl: string;
  createdAt: Date;
}

export default function Home() {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedURL[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchURLs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/all');
        if (res.ok) {
          const data = await res.json();
          setShortenedUrls(data as ShortenedURL[]); // Faz o cast aqui
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Erro ao buscar URLs");
        }
      } catch (error: any) { // any para pegar qualquer tipo de erro
        setError("Erro ao buscar URLs: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchURLs();
  }, []);

  return (
    <div>
      <h1>Encurtador de URL</h1>

      <URLShortenerForm
        onShortenSuccess={(newUrl: ShortenedURL) => {
          setShortenedUrls([newUrl, ...shortenedUrls]);
        }}
      />

      {loading && <p>Carregando URLs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <URLList urls={shortenedUrls} />
    </div>
  );
}

