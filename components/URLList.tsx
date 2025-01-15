interface URLData {
    _id: string,
    shortId: string,
    originalUrl: string,
    createdAt: Date
}

interface URLListProps {
    urls: URLData[];
}

export default function URLList({ urls }: URLListProps) {
    return (
      <ul>
        {urls.map((url) => (
          <li key={url._id}>
            <a href={`/api/get/${url.shortId}`} target="_blank" rel="noopener noreferrer">
              {url.shortId}
            </a> - {url.originalUrl}
          </li>
        ))}
      </ul>
    );
}
