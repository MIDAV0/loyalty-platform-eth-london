const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/` : "/";

type CardProps = {
  title?: string;
  description?: string;
  image?: string;
  points?: number;
  children?: React.ReactNode;
};

export const Card = ({
  title = "Scaffold-ETH 2 App",
  description = "Built with 🏗 Scaffold-ETH 2",
  image = "thumbnail.jpg",
  points = 0,
  children,
}: CardProps) => {
  const imageUrl = baseUrl + image;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        {image && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:image" content={imageUrl} />
          </>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <span className="badge badge-secondary">{points} points</span>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
