import { useState } from 'react';

interface URLShortenerFormProps {
  onShortenSuccess: (newUrl: any) => void;
}

export default function URLShortenerForm({ onShortenSuccess }: URLShortenerFormProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpa mensagens de erro anteriores

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
        onShortenSuccess(data); // Chama a função para atualizar a lista na página principal
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao encurtar URL.'); // Mensagem de erro mais específica
      }
    } catch (err: any) {
      setError('Erro na requisição: ' + err.message); // Captura erros de rede/requisição
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="originalUrl">URL Original:</label>
      <input
        type="text"
        id="originalUrl"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />

      <button type="submit">Encurtar</button>

      {shortUrl && (
        <div>
          <p>URL Encurtada:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
